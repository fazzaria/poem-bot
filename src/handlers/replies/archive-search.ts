import { VALIDATION_POEM_ID_IS_NUMBER, POEM_NOT_FOUND_WITH_ID } from "const";
import { getArchivedPoem, getContextPlayerOrCreate } from "data";
import { messagePlayer } from "messaging";
import { setPlayerState } from "player-state";
import { PlayerState, ReplyHandlerFn } from "types";

export const archiveSearchHandler: ReplyHandlerFn = async (ctx, poemId) => {
  const player = getContextPlayerOrCreate(ctx);
  const poemIdNumber = Number(poemId);
  let errorMessage = "";
  if (isNaN(poemIdNumber)) {
    errorMessage = VALIDATION_POEM_ID_IS_NUMBER;
  } else {
    const poem = getArchivedPoem(poemId);
    if (!poem) {
      errorMessage = POEM_NOT_FOUND_WITH_ID(poemIdNumber);
    } else {
      await poem?.sendToPlayer(player.id, ctx);
    }
  }
  if (errorMessage) {
    await messagePlayer(player.id, player.state, ctx, errorMessage);
  }
  await setPlayerState(player.id, ctx, PlayerState.IN_ARCHIVES);
};
