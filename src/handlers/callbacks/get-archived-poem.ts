import { getContextPlayerOrCreate } from "data";
import { ConversationState, HandlerFn } from "types";
import { enterConversation } from "utils";

export const getArchivedPoemHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrCreate(ctx);
  await enterConversation(ConversationState.GET_ARCHIVED_POEM, player, ctx);
};
