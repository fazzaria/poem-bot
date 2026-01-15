import { commandHandlerMap } from "const";
import { Bot } from "types";

export const handleCommands = (bot: Bot) => {
  for (const [command, handler] of Object.entries(commandHandlerMap)) {
    bot.command(command, handler);
  }
};
