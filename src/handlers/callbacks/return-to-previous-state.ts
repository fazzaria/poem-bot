import { getContextPlayerOrThrow } from "data";
import { setPlayerState } from "player-state";
import { HandlerFn, PlayerState } from "types";

export const returnToPreviousStateHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  await setPlayerState(
    player.id,
    ctx,
    player.previousState || PlayerState.START
  );
};
