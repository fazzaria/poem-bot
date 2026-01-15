import { getGameOrThrow, joinGame } from "data";
import { Context } from "types";
import { getSimulatedPlayer } from "./get-simulated-player";

export const simulatedPlayerJoinsHandler = async (ctx: Context) => {
  const newPlayer = getSimulatedPlayer();
  const testGame = getGameOrThrow("test");
  await joinGame(ctx, testGame, newPlayer);
};
