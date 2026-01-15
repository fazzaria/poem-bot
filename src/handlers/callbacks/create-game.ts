import { getContextPlayerOrThrow } from "data";
import { setPlayerState } from "player-state";
import { HandlerFn, PlayerState } from "types";

export const createGameHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  await setPlayerState(player.id, ctx, PlayerState.LOBBY);
};
