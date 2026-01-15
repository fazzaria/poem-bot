import { gameOptionConversationMap } from "const";
import { getContextPlayerOrThrow } from "data";
import { Context, GameOption } from "types";
import { enterConversation } from "utils";

export const enterGameOptionConversation = async (
  ctx: Context,
  option: GameOption
) => {
  const conversation = gameOptionConversationMap[option];
  const player = getContextPlayerOrThrow(ctx);
  await enterConversation(conversation, player, ctx);
};
