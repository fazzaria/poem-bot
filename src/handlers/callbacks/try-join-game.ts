import { getContextPlayerOrThrow } from "data";
import { ConversationState, HandlerFn } from "types";
import { enterConversation } from "utils";

export const tryJoinGameHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  await enterConversation(ConversationState.GET_GAME_ID, player, ctx);
};
