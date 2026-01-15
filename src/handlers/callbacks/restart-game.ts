import { getContextPlayerOrThrow, getGameOrThrow } from "data";
import { HandlerFn } from "types";

export const restartGameHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  const isHost = player.isHost();
  if (!isHost) return;
  const game = getGameOrThrow(player.gameId);
  await await game.restart(ctx);
};
