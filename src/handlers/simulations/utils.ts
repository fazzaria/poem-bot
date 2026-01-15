import { InlineKeyboard, Keyboard } from "grammy";
import { loremIpsum, simulatedCallbackHandlerMap } from "./const";
import { addHiddenCharacter } from "utils";
import { addGame, joinGame } from "data";
import { getSimulatedPlayer } from "./get-simulated-player";
import { Context } from "types";

export const randomLoremIpsum = (wordCount: number = 10) => {
  const words = loremIpsum.split(" ");
  words.sort(() => Math.random() - 0.5);
  return words.slice(0, wordCount).join(" ");
};

export const addTestingKeyboardButtons = (
  keyboard: InlineKeyboard | Keyboard
) => {
  Object.keys(simulatedCallbackHandlerMap).forEach((callbackName) => {
    keyboard.text(addHiddenCharacter(callbackName)).row();
  });
};

export const addTestData = async (ctx: Context) => {
  const simmy = getSimulatedPlayer();
  const testGame = addGame({ id: "test" });
  await joinGame(ctx, testGame, simmy);
};
