import { HandleFromMapFn } from "types";
import { decodeCallbackName, encodeCallbackName } from "utils";

export const hearsFromMap: HandleFromMapFn = (bot, map) => {
  bot.hears(
    Object.keys(map).map((callbackName) => encodeCallbackName(callbackName)),
    async (ctx) => {
      const key = ctx.message?.text;
      if (!key) return;
      await map[decodeCallbackName(key)]?.(ctx);
    }
  );
};
