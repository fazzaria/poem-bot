import { createConversation } from "@grammyjs/conversations";
import { conversationHandlerMap } from "const";
import { getContextPlayerOrThrow } from "data";
import { Bot, Context } from "types";

export const handleConversations = (bot: Bot) => {
  for (const [conversationName, handler] of Object.entries(
    conversationHandlerMap
  )) {
    bot.use(
      createConversation(async (conversation, ctx: Context) => {
        const player = getContextPlayerOrThrow(ctx);
        await handler(conversation, ctx, player);
      }, conversationName)
    );
  }
};
