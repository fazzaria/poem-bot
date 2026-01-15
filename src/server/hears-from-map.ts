import { HandleFromMapFn } from "types";
import { addHiddenCharacter, removeHiddenCharacter } from "utils";

export const hearsFromMap: HandleFromMapFn = (bot, map) => {
  bot.hears(
    Object.keys(map).map((callbackName) => addHiddenCharacter(callbackName)),
    async (ctx) => {
      const key = ctx.message?.text;
      if (!key) return;
      await map[removeHiddenCharacter(key)]?.(ctx);
    }
  );
};
