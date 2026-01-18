import { getContextPlayerOrThrow, getGame, leaveGame } from "data";
import { setPlayerState } from "player-state";
import { HandlerFn, PlayerState } from "types";

export const returnToPreviousStateHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  const game = getGame(player.gameId);
  if (game && player.state === PlayerState.SETTING_UP_GAME) {
    await leaveGame(ctx, game, player);
    return;
  }
  await setPlayerState(
    player.id,
    ctx,
    player.previousState || PlayerState.START,
  );
};
