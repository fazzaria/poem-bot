import { getGameOrThrow, leaveGame } from "data";
import { messagePlayer } from "messaging";
import { BasicCallback, ConversationFn, ConversationState } from "types";
import { getConversationValue } from "utils";

export const nextLineConversation: ConversationFn = async (
  conversation,
  ctx,
  player
) => {
  const game = getGameOrThrow(player.gameId);

  await getConversationValue(conversation, {
    exitCallback: BasicCallback.LEAVE_GAME,
    ignoreCallbacks: [
      BasicCallback.RETURN_TO_PREVIOUS_STATE,
      BasicCallback.TRY_LEAVE,
    ],
    doEach: async () =>
      await messagePlayer(player.id, ConversationState.GET_NEXT_LINE, ctx),
    handleCancel: async () => {
      await leaveGame(ctx, game, player);
    },
    handleSuccess: async (line: string) => {
      await game.addLine(ctx, line, player.userName);
      return;
    },
  });
};
