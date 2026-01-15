import { getGame, getGameOrThrow } from "data";
import { messagePlayer } from "messaging";
import { setPlayerState } from "player-state";
import {
  Context,
  ConversationState,
  PlayerOverrides,
  PlayerProps,
  PlayerState,
} from "types";
import { enterConversation } from "utils";

export const playerDefaults: Partial<PlayerProps> = {
  gameId: "",
  state: PlayerState.START,
};

export class Player {
  activeMessageId?: number;
  destroy: (id: number) => void;
  gameId?: string;
  id: number;
  simulated?: boolean;
  notification?: string;
  previousState: PlayerState = PlayerState.START;
  state: PlayerState;
  userName: string;

  constructor(overrides: PlayerOverrides) {
    const {
      activeMessageId,
      destroy,
      gameId,
      id,
      notification,
      simulated,
      state,
      userName,
    } = {
      ...playerDefaults,
      ...overrides,
    };
    this.destroy = destroy ?? (() => null);
    this.activeMessageId = activeMessageId;
    this.id = id;
    this.userName = userName;
    this.simulated = simulated;
    this.state = state ?? PlayerState.START;
    this.gameId = gameId;
    this.notification = notification;
  }

  canWrite = () => {
    return ![
      PlayerState.SPECTATING,
      PlayerState.TYPING,
      PlayerState.WAITING_AFTER_WRITING,
    ].includes(this.state);
  };

  clearNotification = () => {
    this.notification = "";
  };

  /* destroy=()=>{
  TODO: run this on player disconnect, advance turn order if needed etc
  } */

  getGame = () => {
    return getGame(this.gameId);
  };

  isHost = () => {
    const game = this.getGame();
    return this.id === game?.hostId;
  };

  isInGame = () => {
    return !!this.gameId && this.state !== PlayerState.SETTING_UP_GAME;
  };

  joinGame = async (ctx: Context, gameId: string, newGame?: boolean) => {
    const game = getGameOrThrow(gameId);
    this.gameId = gameId;
    let newState: PlayerState;
    if (newGame) {
      newState = PlayerState.SETTING_UP_GAME;
    } else {
      newState = game.inProgress ? PlayerState.SPECTATING : PlayerState.LOBBY;
    }
    await setPlayerState(this.id, ctx, newState);
  };

  leaveGame = async (ctx: Context) => {
    this.gameId = undefined;
    await setPlayerState(this.id, ctx, PlayerState.START);
  };

  notify = async (notification: string, ctx: Context) => {
    this.setNotification(notification);
    await this.refreshMessage(ctx);
  };

  refreshMessage = async (ctx: Context) => {
    await messagePlayer(this.id, this.state, ctx);
  };

  setActiveMessageId = (id?: number) => {
    this.activeMessageId = id;
  };

  setGameId = (id: string) => {
    this.gameId = id;
  };

  setNotification = (notification: string) => {
    this.notification = notification;
  };

  setPreviousState = (state: PlayerState) => {
    this.previousState = state;
  };

  takeTurn = async (ctx: Context) => {
    await enterConversation(ConversationState.GET_NEXT_LINE, this, ctx);
  };
}
