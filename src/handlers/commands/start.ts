import { getContextPlayerOrCreate } from "data";
import { addTestData } from "handlers/simulations/utils";
import { setPlayerState } from "player-state";
import { HandlerFn, PlayerState } from "types";

export const startHandler: HandlerFn = async (ctx) => {
  if (process.env.TESTING === "true") addTestData(ctx);
  const player = getContextPlayerOrCreate(ctx);
  await setPlayerState(player.id, ctx, PlayerState.START);
};
