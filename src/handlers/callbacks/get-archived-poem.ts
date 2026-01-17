import { getContextPlayerOrCreate } from "data";
import { setPlayerState } from "player-state";
import { HandlerFn, PlayerState } from "types";

export const getArchivedPoemHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrCreate(ctx);
  await setPlayerState(player.id, ctx, PlayerState.IN_ARCHIVES);
};
