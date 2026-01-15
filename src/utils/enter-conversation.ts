import { Player } from "classes";
import { setPlayerState } from "player-state";
import { Context, ConversationState, PlayerState } from "types";

const { TYPING } = PlayerState;

export const enterConversation = async (
  conversation: ConversationState,
  player: Player,
  ctx: Context
) => {
  console.log("entered conversation", conversation);
  if (player.simulated) return;
  await setPlayerState(player.id, ctx, TYPING);
  await ctx.conversation.enter(conversation, player);
};
