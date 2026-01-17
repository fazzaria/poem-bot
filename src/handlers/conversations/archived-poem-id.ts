import { POEM_NOT_FOUND_WITH_ID, VALIDATION_POEM_ID_IS_NUMBER } from "const";
import { getArchivedPoem, getContextPlayerOrCreate } from "data";
import { messagePlayer } from "messaging";
import { setPlayerState } from "player-state";
import { BasicCallback, ConversationFn, PlayerState } from "types";
import { getConversationValue } from "utils";

export const archivedPoemConversation: ConversationFn = async (
  conversation,
  ctx,
) => {
  const player = getContextPlayerOrCreate(ctx);
  await getConversationValue(conversation, {
    exitCallback: BasicCallback.EXIT_ARCHIVE,
    doEach: async () => {},
    handleCancel: async () => {
      await setPlayerState(player.id, ctx, PlayerState.START);
      return;
    },
    handleSuccess: async (poemId: string) => {
      const poem = getArchivedPoem(poemId);
      await poem?.sendToPlayer(player.id, ctx);
      await setPlayerState(player.id, ctx, PlayerState.IN_ARCHIVES);
      return;
    },
    stay: true,
    validate: async (poemId: string) => {
      const poemIdNumber = Number(poemId);
      let errorMessage = "";
      if (isNaN(poemIdNumber)) {
        errorMessage = VALIDATION_POEM_ID_IS_NUMBER;
      } else {
        const poem = getArchivedPoem(poemId);
        if (!poem) {
          errorMessage = POEM_NOT_FOUND_WITH_ID(poemIdNumber);
        }
      }
      if (errorMessage) {
        await messagePlayer(player.id, player.state, ctx, errorMessage);
        return false;
      }
      return true;
    },
  });
};
