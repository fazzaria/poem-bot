import { getGameOrThrow } from "data";
import { Context } from "types";

export const simulatedHostStartsGameHandler = async (ctx: Context) => {
  const testGame = getGameOrThrow("test");
  await testGame.startGame(ctx);
};
