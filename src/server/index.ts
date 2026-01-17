import "dotenv/config";
import { Bot } from "grammy";
import { conversations } from "@grammyjs/conversations";
import {
  BOT_RUNNING,
  callbackHandlerMap,
  callbackWithDataHandlerMap,
} from "const";
import { Context } from "types";
import { errorHandlingMiddleware } from "utils";
import { handleCallbackQueriesWithData } from "./handle-callback-queries-with-data";
import { hearsFromMap } from "./hears-from-map";
import { handleCommands } from "./handle-commands";
import { handleConversations } from "./handle-conversations-from-map";
import { handleReplies } from "./handle-replies";

const bot = new Bot<Context>(process.env.BOT_TOKEN ?? "");
bot.use(conversations());

handleConversations(bot);
hearsFromMap(bot, callbackHandlerMap);
handleCallbackQueriesWithData(bot, callbackWithDataHandlerMap);
handleCommands(bot);
handleReplies(bot);

bot.catch(errorHandlingMiddleware);

bot.start();

console.log(BOT_RUNNING);
