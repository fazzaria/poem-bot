import { ConversationState, HandlerFn } from "types";
import { enterConversation } from "utils";

export const tryJoinGameHandler: HandlerFn = async (ctx) => {
  await enterConversation(ConversationState.GET_GAME_ID, ctx);
};
