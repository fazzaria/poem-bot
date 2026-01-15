import { getGameOrThrow } from "data";
import { Context } from "types";
import { randomLoremIpsum } from "./utils";

export const simulatePlayerAddsLineHandler = async (ctx: Context) => {
  const testGame = getGameOrThrow("test");
  const activePlayer = testGame.getActivePlayer();
  const line = randomLoremIpsum();
  await testGame.addLine(ctx, line, activePlayer.userName);
};
