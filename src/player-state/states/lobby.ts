import { getGameOrThrow } from "data";
import { StateConfig, StateManagementFn } from "types";

const enter: StateManagementFn = async (player, ctx) => {
  const game = getGameOrThrow(player.gameId ?? "");
  if (game.getPlayers().length > 1) {
    await game.notifyAllOtherPlayers(
      player.id,
      `${player.userName} has joined the game.`,
      ctx
    );
  }
};

const exit: StateManagementFn = async (player, ctx) => {};

export const lobbyState: StateConfig = { enter, exit };
