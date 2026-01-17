import { createConversation } from "@grammyjs/conversations";
import { conversationHandlerMap } from "const";
import { Bot, Context } from "types";

export const handleConversations = (bot: Bot) => {
  for (const [conversationName, handler] of Object.entries(
    conversationHandlerMap
  )) {
    bot.use(
      createConversation(async (conversation, ctx: Context) => {
        await handler(conversation, ctx);
      }, conversationName)
    );
  }
};
