import { replyHandlerMap } from "const";
import { getContextPlayerOrCreate } from "data";
import { Bot } from "types";

export const handleReplies = (bot: Bot) => {
  const replyFilter = bot.filter((ctx) => {
    return ctx.msg?.reply_to_message?.from?.id === ctx.me.id;
  });

  replyFilter.on("message:text", async (ctx) => {
    // TODO: let players message each other as a chatroom if they're in the same game
    const player = getContextPlayerOrCreate(ctx);
    const handlerFn = replyHandlerMap[player.state];
    if (handlerFn) {
      const reply = ctx.message.text;
      await handlerFn(ctx, reply);
    }
  });
};
