import { addGame, getContextPlayerOrThrow, joinGame } from "data";
import { HandlerFn } from "types";

export const setUpGameHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  const game = addGame();
  await joinGame(ctx, game, player, true);
};
