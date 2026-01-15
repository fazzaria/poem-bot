import { HandlerMap } from "types";
import { SimulationCallbacks } from "./types";
import { simulatedHostStartsGameHandler } from "./host-starts-game";
import { simulatePlayerAddsLineHandler } from "./next-player-adds-line";
import { simulatedPlayerLeavesHandler } from "./simulated-player-leaves";
import { simulatedPlayerJoinsHandler } from "./join-simulated-player";

export const simulatedCallbackHandlerMap: HandlerMap<SimulationCallbacks> = {
  [SimulationCallbacks.HOST_STARTS_GAME]: simulatedHostStartsGameHandler,
  [SimulationCallbacks.PLAYER_ADDS_LINE]: simulatePlayerAddsLineHandler,
  [SimulationCallbacks.PLAYER_JOINS]: simulatedPlayerJoinsHandler,
  [SimulationCallbacks.PLAYER_LEAVES]: simulatedPlayerLeavesHandler,
};

export const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
