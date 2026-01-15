import { getContextPlayerOrCreate } from "data";
import { setPlayerState } from "player-state";
import { HandlerFn, PlayerState } from "types";

export const restartAppHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrCreate(ctx);
  await setPlayerState(player.id, ctx, PlayerState.START);
};
