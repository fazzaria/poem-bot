import { inspoHandler, startHandler } from "handlers";
import { Command, HandlerMap } from "types";

export const commandHandlerMap: HandlerMap<Command> = {
  [Command.START]: startHandler,
  [Command.INSPO]: inspoHandler,
};
