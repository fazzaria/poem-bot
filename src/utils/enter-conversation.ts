import { getContextPlayerOrThrow } from "data";
import { setPlayerState } from "player-state";
import { Context, ConversationState, PlayerState } from "types";

const { TYPING } = PlayerState;

export const enterConversation = async (
  conversation: ConversationState,
  ctx: Context,
) => {
  console.log("entering conversation");
  const player = getContextPlayerOrThrow(ctx);
  await setPlayerState(player.id, ctx, TYPING);
  await ctx.conversation.enter(conversation);
};
