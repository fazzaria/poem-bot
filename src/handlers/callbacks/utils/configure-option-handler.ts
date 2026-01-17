import { gameOptionConversationMap } from "const";
import { Context, GameOption } from "types";
import { enterConversation } from "utils";

export const enterGameOptionConversation = async (
  ctx: Context,
  option: GameOption
) => {
  const conversation = gameOptionConversationMap[option];
  await enterConversation(conversation, ctx);
};
