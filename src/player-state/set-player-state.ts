import { messagePlayer } from "messaging";
import { Context, PlayerState } from "types";
import { stateRegistry } from "./states/registry";
import { getPlayerOrThrow } from "data";

export const setPlayerState = async (
  playerId: number,
  ctx: Context,
  newState: PlayerState,
  noMessage?: boolean,
) => {
  const player = getPlayerOrThrow(playerId);
  const { state: oldState } = player;
  console.log(
    `transitioning player ${player.userName} from ${oldState} to ${newState}`,
  );

  player.setPreviousState(oldState);
  player.state = newState;

  const oldConfig = stateRegistry[oldState];
  const newConfig = stateRegistry[newState];

  if (oldConfig.exit) await oldConfig.exit(player);

  if (!noMessage) await messagePlayer(player.id, newState, ctx);
  await newConfig.enter(player);
};
