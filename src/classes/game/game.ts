import { HAS_JOINED, HAS_LEFT, HOST_LEFT, HOST_RESTARTED } from "const";
import { getPlayerOrThrow, getPlayers, leaveGame } from "data";
import { setPlayerState } from "player-state";
import {
  Context,
  GameOptions,
  GameOverrides,
  GameProps,
  PlayerState,
} from "types";
import { generateGameId } from "./generate-game-id";
import { Player } from "../player";
import { Poem } from "../poem";
import { forPlayers, randomStarDecorator } from "utils";
import { messagePlayer } from "messaging";
import { AllStateFn, OthersStateFn, AllFn, OthersFn } from "./types";

export const forAllOtherPlayers = async ({
  callback,
  fromPlayerId,
  players,
}: {
  fromPlayerId: number;
  callback: (player: Player) => Promise<void>;
  players: Player[];
}) => {
  const otherPlayers = players.filter((player) => player.id !== fromPlayerId);
  await forPlayers(otherPlayers, callback);
};

export const gameDefaults: Partial<GameProps> = {
  inProgress: false,
};

// TODO decompose this into smaller bits
export class Game {
  currentWriterId?: number;
  destroy: () => void;
  options: GameOptions;
  hostId?: number;
  id: string;
  inProgress: boolean;
  poem: Poem;
  playerIds: number[];

  constructor(overrides: GameOverrides) {
    const {
      currentWriterId,
      destroy,
      hostId,
      id,
      inProgress,
      options,
      poemProps,
      playerIds,
    } = {
      ...gameDefaults,
      ...overrides,
    };
    this.currentWriterId = currentWriterId;
    this.destroy = destroy ? () => destroy(this.id) : () => null;
    this.hostId = hostId;
    this.id = id ?? generateGameId();
    this.inProgress = !!inProgress;
    this.options = { ...(options || {}) };
    this.playerIds = playerIds ?? [];
    this.poem = new Poem({ gameId: this.id, ...(poemProps ?? {}) });
    /* Object.values(helperFns).forEach(
      (fn) => (this[fn.name as keyof Helpers] = fn),
    ); */
  }

  advanceTurnOrder = async (ctx: Context, previousPlayerId?: number) => {
    const nextPlayer = this.getActivePlayer();
    const gameDone = !nextPlayer;
    if (gameDone) {
      await this.finish(ctx);
      return;
    }
    if (previousPlayerId && this.hasPlayer(previousPlayerId)) {
      await setPlayerState(
        previousPlayerId,
        ctx,
        PlayerState.WAITING_AFTER_WRITING,
      );
    }

    const { id: nextPlayerId } = nextPlayer;
    // messages to the previous and next player are already handled by state changes
    await forPlayers(this.getPlayers(), async (player) => {
      if (player.id === nextPlayerId) {
        await setPlayerState(nextPlayerId, ctx, PlayerState.WRITING);
      } else if (![previousPlayerId].includes(player.id)) {
        player.refreshMessage(ctx);
      }
    });
  };

  removePlayer = async (player: Player, ctx: Context) => {
    if (player.id === this.hostId) {
      await this.removeHost(ctx);
      return;
    }
    if (!this.getHost()) {
      return;
    }
    this.removePlayerId(player.id);

    await this.messageAllOtherPlayers({
      ctx,
      customMessage: HAS_LEFT(player.userName),
      fromPlayerId: player.id,
      players: this.getPlayers(),
      state: null,
    });
    if (this.poem.completed) return;
    const playerWasActive =
      this.inProgress &&
      !this.getPlayers().find((p) => p.state === PlayerState.WRITING);
    if (playerWasActive) {
      await this.advanceTurnOrder(ctx, player.id);
    } else {
      await this.refreshPlayerMessages({ ctx, players: this.getPlayers() });
    }
  };

  removeHost = async (ctx: Context) => {
    await this.messageAllOtherPlayers({
      ctx,
      customMessage: HOST_LEFT,
      fromPlayerId: this.hostId!,
      players: this.getPlayers(),
      state: PlayerState.START,
    });
    this.removePlayerId(this.hostId);

    const nonHostPlayers = this.getPlayers().filter(
      (player) => player.id !== this.hostId,
    );
    await forPlayers(
      nonHostPlayers,
      async (player) => await leaveGame(ctx, this, player),
    );
    this.destroy();
  };

  startGame = async (ctx: Context) => {
    await this.messageAllOtherPlayers({
      ctx,
      customMessage: "The host has started the game.",
      fromPlayerId: this.hostId!,
      players: this.getPlayers(),
      state: null,
    });
    this.inProgress = true;
    this.shufflePlayers();
    const firstPlayer = this.getPlayers()[0];
    await this.transitionAllOtherPlayers({
      ctx,
      fromPlayerId: firstPlayer.id,
      players: this.getPlayers(),
      state: PlayerState.WAITING_TO_WRITE,
    });
    await setPlayerState(firstPlayer.id, ctx, PlayerState.WRITING);
  };

  addPlayer = async (playerId: number, ctx: Context) => {
    const player = getPlayerOrThrow(playerId);
    this.playerIds.push(playerId);
    if (this.playerIds.length === 1) {
      this.hostId = playerId;
    } else {
      await this.messageAllOtherPlayers({
        ctx,
        customMessage: HAS_JOINED(player.userName),
        fromPlayerId: playerId,
        players: this.getPlayers(),
        state: null,
      });
      await this.refreshOtherPlayerMessages({
        ctx,
        players: this.getPlayers(),
        fromPlayerId: playerId,
      });
    }
  };

  finish = async (ctx: Context) => {
    this.poem.complete();
    await this.transitionPlayers({
      ctx,
      players: this.getPlayers(),
      state: PlayerState.POST_GAME,
    });

    await forPlayers(this.getPlayers(), (player) =>
      this.poem.sendToPlayer(player.id, ctx),
    );
  };

  previousLine = () => {
    return this.poem.previousLine();
  };

  prunePlayerIds = () => {
    const players = this.getPlayers();
    for (const player of players) {
      if (player.gameId !== this.id) {
        this.removePlayerId(player.id);
      }
    }
  };

  getActivePlayer = (): Player | undefined => {
    const eligiblePlayers = this.getEligiblePlayers();
    return eligiblePlayers[0];
  };

  getEligiblePlayers = () => {
    return this.getPlayers().filter((player) => player.canWrite());
  };

  getHost = (): Player | undefined => {
    return this.getPlayers().find((player) => player.isHost());
  };

  getPlayers = () => {
    return getPlayers(this.playerIds);
  };

  hasPlayer = (playerId?: number) => {
    return playerId && this.playerIds.includes(playerId);
  };

  removePlayerId = (idToRemove?: number) => {
    if (!idToRemove) return;
    const idIndex = this.playerIds.findIndex((id) => id === idToRemove);
    this.playerIds.splice(idIndex, 1);
  };

  setOptions = (newOptions: GameOptions) => {
    this.options = { ...this.options, ...newOptions };
  };

  private shufflePlayers = () => {
    this.playerIds.sort(() => Math.random() - 0.5);
  };

  addLine = async (ctx: Context, line: string, author: Player) => {
    this.poem.addLine(line, author.userName);
    await messagePlayer(
      author.id,
      author.state,
      ctx,
      `Your line has been added! ${randomStarDecorator()}`,
    );
    await this.advanceTurnOrder(ctx, author.id);
  };

  restart = async (ctx: Context) => {
    this.poem = new Poem({ gameId: this.id });
    this.inProgress = false;
    await this.messageAllOtherPlayers({
      ctx,
      customMessage: HOST_RESTARTED,
      fromPlayerId: this.hostId!,
      players: this.getPlayers(),
      state: null,
    });
    await this.transitionPlayers({
      players: this.getPlayers(),
      state: PlayerState.LOBBY,
      ctx,
    });
  };

  forAllOtherPlayers = async ({
    callback,
    fromPlayerId,
    players,
  }: {
    fromPlayerId: number;
    callback: (player: Player) => Promise<void>;
    players: Player[];
  }) => {
    const otherPlayers = players.filter((player) => player.id !== fromPlayerId);
    await forPlayers(otherPlayers, callback);
  };

  messagePlayers: AllStateFn = async ({
    ctx,
    customMessage = "",
    players,
    state,
  }) => {
    await forPlayers(players, (player) =>
      messagePlayer(player.id, state || player.state, ctx, customMessage),
    );
  };

  messageAllOtherPlayers: OthersStateFn = async ({
    ctx,
    customMessage = "",
    fromPlayerId,
    players,
    state = null,
  }) => {
    await forAllOtherPlayers({
      players,
      fromPlayerId,
      callback: (player) =>
        messagePlayer(player.id, state || player.state, ctx, customMessage),
    });
  };

  transitionPlayers: AllStateFn = async ({ ctx, players, state }) => {
    await forPlayers(players, (player) =>
      setPlayerState(player.id, ctx, state ?? player.state),
    );
  };

  transitionAllOtherPlayers: OthersStateFn = async ({
    ctx,
    fromPlayerId,
    players,
    state,
  }) => {
    await forAllOtherPlayers({
      fromPlayerId,
      players,
      callback: (player) =>
        setPlayerState(player.id, ctx, state ?? player.state),
    });
  };

  refreshPlayerMessages: AllFn = async ({ ctx, players }) => {
    await forPlayers(players, (player) => player.refreshMessage(ctx));
  };

  refreshOtherPlayerMessages: OthersFn = async ({
    ctx,
    players,
    fromPlayerId,
  }) => {
    await forAllOtherPlayers({
      callback: (player) => player.refreshMessage(ctx),
      fromPlayerId,
      players,
    });
  };
}
