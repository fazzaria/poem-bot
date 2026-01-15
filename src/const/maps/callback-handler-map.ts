import {
  beginGameHandler,
  createGameHandler,
  deleteGameDescriptionHandler,
  enterGameOptionConversation,
  getArchivedPoemHandler,
  leaveGameHandler,
  restartAppHandler,
  restartGameHandler,
  returnToPreviousStateHandler,
  setUpGameHandler,
  tryJoinGameHandler,
  tryLeaveGameHandler,
} from "handlers";
import {
  BasicCallback,
  Callback,
  Context,
  GameConfigCallback,
  GameOption,
  HandlerMap,
} from "types";

const gameOptionConversationFn =
  (gameOption: GameOption) => async (ctx: Context) => {
    await enterGameOptionConversation(ctx, gameOption);
  };

export const callbackHandlerMap: HandlerMap<Callback> = {
  [BasicCallback.BEGIN_GAME]: beginGameHandler,
  [BasicCallback.CREATE_GAME]: createGameHandler,
  [BasicCallback.LEAVE_GAME]: leaveGameHandler,
  [BasicCallback.RESTART_APP]: restartAppHandler,
  [BasicCallback.RESTART_GAME]: restartGameHandler,
  [BasicCallback.RETURN_TO_PREVIOUS_STATE]: returnToPreviousStateHandler,
  [BasicCallback.SET_UP_GAME]: setUpGameHandler,
  [BasicCallback.TRY_JOIN]: tryJoinGameHandler,
  [BasicCallback.TRY_LEAVE]: tryLeaveGameHandler,
  [BasicCallback.VIEW_ARCHIVED_POEMS]: getArchivedPoemHandler,
  [GameConfigCallback.ADD_DESCRIPTION]: gameOptionConversationFn(
    GameOption.DESCRIPTION
  ),
  [GameConfigCallback.EDIT_DESCRIPTION]: gameOptionConversationFn(
    GameOption.DESCRIPTION
  ),
  [GameConfigCallback.REMOVE_DESCRIPTION]: deleteGameDescriptionHandler,
};
