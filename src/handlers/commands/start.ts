import { Poem } from "classes";
import {
  addArchivedPoem,
  addGame,
  addPlayer,
  getContextPlayerOrCreate,
  getGame,
  joinGame,
  leaveGame,
} from "data";
import { setPlayerState } from "player-state";
import { HandlerFn, PlayerState } from "types";

const testingGame = true;
const testingArchive = false;

export const startHandler: HandlerFn = async (ctx) => {
  if (testingArchive) {
    const testPoem = new Poem({ id: 1234, gameId: "TEST" });
    testPoem.addLine("Line", "Test author");
    addArchivedPoem(testPoem);
  }
  if (testingGame) {
    const testGame =
      getGame("test") ||
      addGame({ hostId: Number(process.env.MY_USERID), id: "TEST" });
    for (const testuser of [
      {
        id: Number(process.env.MY_USERID),
        name: process.env.MY_USERNAME ?? "You",
      },
      { id: Number(process.env.TEST_USER_1_ID), name: "First Test User" },
      { id: Number(process.env.TEST_USER_2_ID), name: "Second Test User" },
    ]) {
      const newPlayer = addPlayer({ id: testuser.id, userName: testuser.name });
      await joinGame(ctx, testGame, newPlayer);
    }
    return;
  }
  const player = getContextPlayerOrCreate(ctx);
  const game = getGame(player.gameId);
  if (game) {
    await leaveGame(ctx, game, player);
  }
  await setPlayerState(player.id, ctx, PlayerState.START);
};
