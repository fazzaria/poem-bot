import { HandleFromMapFn } from "types";
import { decodeCallbackData } from "utils";

export const handleCallbackQueriesWithData: HandleFromMapFn = (bot, map) => {
  bot.callbackQuery(/^[A-Z_]+(\|.+)?$/, async (ctx) => {
    const { action, params } = decodeCallbackData(ctx.callbackQuery.data!);
    const handler = map[action as keyof typeof map];
    if (!handler) return;

    await ctx.answerCallbackQuery();
    await handler(ctx, params);
  });
};
