import { Global } from "classes";
import { PLAYER_NOT_FOUND } from "const";
import { Context } from "types";
import { getUserInfo } from "utils";

const global = new Global();

const {
  addArchivedPoem,
  addGame,
  addPlayer,
  deleteGame,
  getGame,
  getGames,
  getPlayer,
  getPlayers,
  getArchivedPoem,
  getArchivedPoems,
  joinGame,
  leaveGame,
} = global;

export {
  addArchivedPoem,
  addGame,
  addPlayer,
  deleteGame,
  getGame,
  getGames,
  getPlayer,
  getPlayers,
  getArchivedPoem,
  getArchivedPoems,
  joinGame,
  leaveGame,
};

export const getGlobalData = () => {
  return global;
};

export const getGameOrThrow = (gameId: string = "") => {
  const game = getGame(gameId);
  if (game) return game;
  throw new Error("Game not found.");
};

export const getPlayerOrThrow = (id: number) => {
  const player = getPlayer(id);
  if (player) return player;
  throw new Error(PLAYER_NOT_FOUND);
};

export const getContextPlayer = (ctx: Context) => {
  const id = getUserInfo(ctx).userId;
  return getPlayer(id);
};

export const getContextPlayerOrCreate = (ctx: Context) => {
  const player = getContextPlayer(ctx);
  if (player) return player;
  const { userId, userName } = getUserInfo(ctx);
  const newPlayer = addPlayer({
    id: userId,
    userName: userName,
  });
  return newPlayer;
};

export const getContextPlayerOrThrow = (ctx: Context) => {
  const player = getContextPlayer(ctx);
  if (player) return player;
  throw new Error(PLAYER_NOT_FOUND);
};
