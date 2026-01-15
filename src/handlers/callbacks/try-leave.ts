import { getContextPlayerOrThrow } from "data";
import { setPlayerState } from "player-state/set-player-state";
import { HandlerFn, PlayerState } from "types";

export const tryLeaveGameHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  await setPlayerState(player.id, ctx, PlayerState.TRYING_LEAVE);
};
