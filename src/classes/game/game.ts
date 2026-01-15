import { getPlayers } from "data";
import { messagePlayer } from "messaging";
import { setPlayerState } from "player-state";
import {
  Context,
  GameOptions,
  GameOverrides,
  GameProps,
  MessagingState,
  PlayerState,
} from "types";
import { generateGameId } from "./generate-game-id";
import { Player } from "../player";
import { Poem } from "../poem";

export const gameDefaults: Partial<GameProps> = {
  inProgress: false,
};

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
  }

  addLine = async (ctx: Context, line: string, author: string) => {
    this.poem.addLine(line, author);
    await this.advanceTurnOrder(ctx);
  };

  addPlayer = (playerId: number) => {
    if (!this.playerIds.length) this.hostId = playerId;
    this.playerIds.push(playerId);
  };

  advanceTurnOrder = async (ctx: Context) => {
    const eligiblePlayers = this.getEligiblePlayers();
    const gameDone = eligiblePlayers.length === 0;
    if (gameDone) {
      await this.finish(ctx);
    } else {
      const activePlayer = this.getActivePlayer();
      await activePlayer.takeTurn(ctx);
    }
  };

  getActivePlayer = () => {
    return this.getEligiblePlayers()[0];
  };

  getEligiblePlayers = () => {
    return this.getPlayers().filter((player) => player.canWrite());
  };

  getPlayers = () => {
    return getPlayers(this.playerIds);
  };

  hasPlayer = (playerId: number) => {
    return this.playerIds.includes(playerId);
  };

  finish = async (ctx: Context) => {
    this.poem.complete();
    await this.transitionPlayers(PlayerState.POST_GAME, ctx);
  };

  // todo: use Promise.all instead
  private forPlayers = async (
    players: Player[],
    callback: (player: Player) => Promise<void>
  ) => {
    for (const player of players) {
      try {
        await callback(player);
      } catch (err) {
        console.error(`Error on iterate players helper`, err);
      }
    }
  };

  private forAllPlayers = async (
    callback: (player: Player) => Promise<void>
  ) => {
    const players = this.getPlayers();
    await this.forPlayers(players, callback);
  };

  private forAllOtherPlayers = async (
    fromPlayerId: number,
    callback: (player: Player) => Promise<void>
  ) => {
    const players = this.getPlayers();
    const otherPlayers = players.filter((player) => player.id !== fromPlayerId);
    await this.forPlayers(otherPlayers, callback);
  };

  messagePlayers = async (state: MessagingState, ctx: Context) => {
    await this.forAllPlayers((player) => messagePlayer(player.id, state, ctx));
  };

  messageAllOtherPlayers = async (
    fromPlayerId: number,
    state: MessagingState,
    ctx: Context
  ) => {
    await this.forAllOtherPlayers(fromPlayerId, (player) =>
      messagePlayer(player.id, state, ctx)
    );
  };

  notifyPlayers = async (notification: string, ctx: Context) => {
    await this.forAllPlayers((player) => player.notify(notification, ctx));
  };

  notifyAllOtherPlayers = async (
    fromPlayerId: number,
    notification: string,
    ctx: Context
  ) => {
    await this.forAllOtherPlayers(fromPlayerId, (player) =>
      player.notify(notification, ctx)
    );
  };

  transitionPlayers = async (state: PlayerState, ctx: Context) => {
    await this.forAllPlayers((player) => setPlayerState(player.id, ctx, state));
  };

  refreshPlayerMessages = async (ctx: Context) => {
    await this.forAllPlayers((player) => player.refreshMessage(ctx));
  };

  removePlayer = async (player: Player, ctx: Context) => {
    if (this.playerIds.length === 1) {
      this.destroy();
      return;
    }
    const playerIndex = this.playerIds.findIndex((id) => id === player.id);
    if (playerIndex > -1) {
      this.playerIds.splice(playerIndex, 1);
    }
    if (this.inProgress) {
      await this.advanceTurnOrder(ctx);
    }
  };

  restart = async (ctx: Context) => {
    await this.transitionPlayers(PlayerState.LOBBY, ctx);
    await this.notifyPlayers("The host has restarted the game.", ctx);
  };

  setOptions = (newOptions: GameOptions) => {
    this.options = { ...this.options, ...newOptions };
  };

  private shufflePlayers = () => {
    this.playerIds.sort(() => Math.random() - 0.5);
  };

  startGame = async (ctx: Context) => {
    this.inProgress = true;
    await this.transitionPlayers(PlayerState.WAITING_TO_WRITE, ctx);
    this.shufflePlayers();
    await this.advanceTurnOrder(ctx);
  };
}
