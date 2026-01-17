import { messagePlayer } from "messaging";
import { setPlayerState } from "player-state";
import { forPlayers } from "utils";
import { Player } from "../player";
import { AllFn, AllStateFn, OthersFn, OthersStateFn } from "./types";

export const forAllOtherPlayers = async ({
  callback,
  fromPlayerId,
  players,
}: {
  fromPlayerId: number;
  callback: (player: Player) => Promise<void>;
  players: Player[];
}) => {
  const otherPlayers = players.filter((player) => player.id !== fromPlayerId);
  await forPlayers(otherPlayers, callback);
};

export const messagePlayers: AllStateFn = async ({
  ctx,
  customMessage = "",
  players,
  state,
}) => {
  await forPlayers(players, (player) =>
    messagePlayer(player.id, state || player.state, ctx, customMessage),
  );
};

export const messageAllOtherPlayers: OthersStateFn = async ({
  ctx,
  customMessage = "",
  fromPlayerId,
  players,
  state = null,
}) => {
  await forAllOtherPlayers({
    players,
    fromPlayerId,
    callback: (player) =>
      messagePlayer(player.id, state || player.state, ctx, customMessage),
  });
};

export const transitionPlayers: AllStateFn = async ({
  ctx,
  players,
  state,
}) => {
  await forPlayers(players, (player) =>
    setPlayerState(player.id, ctx, state ?? player.state),
  );
};

export const transitionAllOtherPlayers: OthersStateFn = async ({
  ctx,
  fromPlayerId,
  players,
  state,
}) => {
  await forAllOtherPlayers({
    fromPlayerId,
    players,
    callback: (player) => setPlayerState(player.id, ctx, state ?? player.state),
  });
};

export const refreshPlayerMessages: AllFn = async ({ ctx, players }) => {
  await forPlayers(players, (player) => player.refreshMessage(ctx));
};

export const refreshOtherPlayerMessages: OthersFn = async ({
  ctx,
  players,
  fromPlayerId,
}) => {
  await forAllOtherPlayers({
    callback: (player) => player.refreshMessage(ctx),
    fromPlayerId,
    players,
  });
};
