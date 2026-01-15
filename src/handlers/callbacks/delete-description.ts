import { getContextPlayerOrThrow, getGameOrThrow } from "data";
import { setPlayerState } from "player-state";
import { HandlerFn, PlayerState } from "types";

const { SETTING_UP_GAME } = PlayerState;

export const deleteGameDescriptionHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  const game = getGameOrThrow(player.gameId);
  game.setOptions({ description: undefined });
  await setPlayerState(player.id, ctx, SETTING_UP_GAME);
};
