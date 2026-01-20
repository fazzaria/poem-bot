import { Player } from "classes";
import { getGameOrThrow } from "data";
import {
  BasicCallback,
  Callback,
  ConversationState,
  GameConfigCallback,
  GameOption,
  MessagingState,
  PlayerState,
} from "types";

export const stateKeyboardButtonMap: {
  [key in MessagingState]: ((player: Player) => Callback[]) | null;
} = {
  [PlayerState.IN_ARCHIVES]: (_player) => {
    return [BasicCallback.EXIT_ARCHIVE];
  },
  [PlayerState.LOBBY]: (player) => {
    const isHost = player.isHost();
    if (isHost) {
      return [BasicCallback.BEGIN_GAME];
    }
    return [];
  },
  [PlayerState.POST_GAME]: (player) => {
    const isHost = player.isHost();
    if (isHost) return [BasicCallback.RESTART_GAME];
    return [];
  },
  [PlayerState.WRITING]: (_player) => [],
  [PlayerState.SETTING_UP_GAME]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const hasDescription = !!game?.options[GameOption.DESCRIPTION];
    return [
      ...(hasDescription
        ? [
            GameConfigCallback.EDIT_DESCRIPTION,
            GameConfigCallback.REMOVE_DESCRIPTION,
          ]
        : [GameConfigCallback.ADD_DESCRIPTION]),
      BasicCallback.CREATE_GAME,
      // should always be START
      BasicCallback.RETURN_TO_PREVIOUS_STATE,
    ];
  },
  [PlayerState.SPECTATING]: (_player) => [],
  [PlayerState.START]: (_player) => [
    BasicCallback.TRY_JOIN,
    BasicCallback.SET_UP_GAME,
    BasicCallback.VIEW_ARCHIVED_POEMS,
  ],
  [PlayerState.TRYING_LEAVE]: (_player) => [
    BasicCallback.RETURN_TO_PREVIOUS_STATE,
    BasicCallback.LEAVE_GAME,
  ],
  [PlayerState.TYPING]: (_player) => {
    return [];
  },
  [PlayerState.VIEWING_ARCHIVED_POEM]: (_player) => {
    return [BasicCallback.EXIT_ARCHIVE];
  },
  [PlayerState.WAITING_AFTER_WRITING]: (_player) => [],
  [PlayerState.WAITING_TO_WRITE]: (_player) => [],
  [ConversationState.GET_ARCHIVED_POEM]: (_player) => [
    BasicCallback.RETURN_TO_PREVIOUS_STATE,
  ],
  [ConversationState.GET_GAME_DESCRIPTION]: (_player) => [
    BasicCallback.RETURN_TO_PREVIOUS_STATE,
  ],
  [ConversationState.GET_GAME_ID]: (_player) => [
    BasicCallback.RETURN_TO_PREVIOUS_STATE,
  ],
};
