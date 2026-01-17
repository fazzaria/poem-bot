import { getContextPlayerOrThrow, getGameOrThrow, leaveGame } from "data";
import { HandlerFn } from "types";

export const leaveGameHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  const game = getGameOrThrow(player.gameId);
  await leaveGame(ctx, game, player);
};
