import { getGames } from "data";
import { randomString } from "utils";

export const generateGameId = () => {
  const games = getGames();
  const maxAttempts = 10;
  let gameId = "";
  for (let i = 0; i < maxAttempts; i++) {
    gameId = randomString();
    if (!games[gameId]) break;
  }

  return gameId;
};
