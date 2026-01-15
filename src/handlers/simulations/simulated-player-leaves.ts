import { getGameOrThrow, leaveGame } from "data";
import { Context } from "types";

export const simulatedPlayerLeavesHandler = async (ctx: Context) => {
  const testGame = getGameOrThrow("test");
  const randomSimmy = testGame
    .getPlayers()
    .find((player) => player.userName.includes("Simmy_Smith"));
  if (!randomSimmy) throw "Couldn't find a Simmy";
  await leaveGame(ctx, testGame, randomSimmy);
};
