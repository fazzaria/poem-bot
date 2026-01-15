import { deleteGame } from "data";
import { PlayerState, StateConfig, StateManagementFn } from "types";

const enter: StateManagementFn = async (player, ctx) => {};

const exit: StateManagementFn = async (player, ctx) => {
  if (player.state !== PlayerState.LOBBY) {
    deleteGame(player.gameId);
  }
};

export const settingUpGameState: StateConfig = { enter, exit };
