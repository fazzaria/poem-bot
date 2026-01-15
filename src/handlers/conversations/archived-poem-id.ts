import { getArchivedPoem } from "data";
import { messagePlayer } from "messaging";
import { BasicCallback, ConversationFn, ConversationState } from "types";
import { getConversationValue } from "utils";

export const archivedPoemConversation: ConversationFn = async (
  conversation,
  ctx,
  player
) => {
  await getConversationValue(conversation, {
    exitCallback: BasicCallback.RETURN_TO_PREVIOUS_STATE,
    doEach: async () => {
      await messagePlayer(player.id, ConversationState.GET_ARCHIVED_POEM, ctx);
    },
    handleCancel: async () => {
      return;
    },
    handleSuccess: async (poemId: string) => {
      const poem = getArchivedPoem(poemId);
      await poem?.sendToPlayer(player.id, ctx);
      return;
    },
    validate: (poemId: string) => {
      const poem = getArchivedPoem(poemId);
      if (poem) {
        return true;
      }
      player.setNotification(`Poem with id ${poemId} not found.`);
      return false;
    },
  });
  await messagePlayer(player.id, player.state, ctx);
};
