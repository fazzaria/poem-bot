import {
  Bot as BotType,
  CallbackQueryContext,
  CommandContext,
  Context as GrammyContext,
} from "grammy";
import { ConversationFlavor } from "@grammyjs/conversations";
import { MenuFlavor } from "@grammyjs/menu";

type RawContext =
  | CallbackQueryContext<GrammyContext>
  | CommandContext<GrammyContext>;

export type Context = ConversationFlavor<RawContext> & MenuFlavor;

export type Bot = BotType<Context>;

export type HandlerFn = (ctx: Context) => Promise<void>;
export type CallbackData = { id: string };
export type DataHandlerFn = (ctx: Context, data: CallbackData) => Promise<void>;
export type HandlerMap<T extends string | number | symbol> = {
  [key in T]: HandlerFn;
};
export type HandleFromMapFn = (
  bot: Bot,
  map: Record<string, HandlerFn>,
) => void;
