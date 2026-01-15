import { getContextPlayerOrThrow, getGameOrThrow } from "data";
import { HandlerFn } from "types";

export const beginGameHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  const game = getGameOrThrow(player.gameId);
  const isHost = player.isHost();
  if (!isHost) {
    await player.notify("Only the host can start the game.", ctx);
    return;
  }
  await game.startGame(ctx);
};
