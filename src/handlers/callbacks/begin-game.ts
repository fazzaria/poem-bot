import { ONLY_HOST_CAN_START } from "const";
import { getContextPlayerOrThrow, getGameOrThrow } from "data";
import { messagePlayer } from "messaging";
import { HandlerFn } from "types";

export const beginGameHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  const game = getGameOrThrow(player.gameId);
  const isHost = player.isHost();
  if (!isHost) {
    await messagePlayer(player.id, player.state, ctx, ONLY_HOST_CAN_START);
    return;
  }
  await game.startGame(ctx);
};
