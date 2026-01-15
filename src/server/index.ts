import "dotenv/config";
import { Bot } from "grammy";
import { conversations } from "@grammyjs/conversations";
import { callbackHandlerMap, callbackWithDataHandlerMap } from "const";
import { simulatedCallbackHandlerMap } from "handlers";
import { Context } from "types";
import { errorHandlingMiddleware } from "utils";
import { handleCallbackQueriesWithData } from "./handle-callback-queries-with-data";
import { hearsFromMap } from "./hears-from-map";
import { handleCommands } from "./handle-commands";
import { handleConversations } from "./handle-conversations-from-map";

const bot = new Bot<Context>(process.env.BOT_TOKEN ?? "");
bot.use(conversations());

handleConversations(bot);
hearsFromMap(bot, callbackHandlerMap);
if (process.env.TESTING) hearsFromMap(bot, simulatedCallbackHandlerMap);
handleCallbackQueriesWithData(bot, callbackWithDataHandlerMap);
handleCommands(bot);

bot.catch(errorHandlingMiddleware);

bot.start();

console.log("poem bot is now running.");
