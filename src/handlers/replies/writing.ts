import { getContextPlayerOrThrow, getGameOrThrow } from "data";
import { ReplyHandlerFn } from "types";

export const writingReplyHandler: ReplyHandlerFn = async (ctx, reply) => {
  // TODO add validation
  const player = getContextPlayerOrThrow(ctx);
  const game = getGameOrThrow(player.gameId);
  await game.addLine(ctx, reply, player);
};
