import { getContextPlayerOrThrow } from "data";
import { HandlerFn } from "types";

export const leaveGameHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  await player.leaveGame(ctx);
};
