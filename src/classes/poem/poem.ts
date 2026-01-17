import { InlineKeyboard } from "grammy";
import { RETRIEVE_FROM_ARCHIVE } from "const";
import { addArchivedPoem, getPlayerOrThrow } from "data";
import { sanitizeHtml } from "messaging";
import { CallbackWithData, Context, Line, PoemOverrides } from "types";
import { encodeCallbackData } from "utils";
import { generatePoemId } from "./generate-poem-id";
export { Player } from "../player";

export class Poem {
  completed?: boolean;
  gameId: string;
  id: number;
  lines: Line[];
  messageId?: number;

  constructor(overrides: PoemOverrides) {
    const { gameId, id, lines } = {
      ...overrides,
    };
    this.gameId = gameId;
    this.id = id ?? generatePoemId();
    this.lines = lines ?? [];
  }

  addLine = (text: string, author: string) => {
    this.lines.push({
      author,
      date: new Date().toLocaleString(),
      text: text.trim(),
    });
  };

  compile = (includeMeta?: boolean) => {
    let compiledPoem = this.lines
      .map((line) => {
        if (includeMeta) {
          const { author, date } = line;
          const metaPrefix = `${author} (${date}):`;
          return `<u>${metaPrefix}</u>\n${line.text}`;
        }
        return line.text;
      })
      .join("\n");
    compiledPoem += `\n\n${RETRIEVE_FROM_ARCHIVE(this.id)}`;
    return sanitizeHtml(compiledPoem);
  };

  complete = () => {
    this.completed = true;
    addArchivedPoem(this);
  };

  // TODO convert to markdown, but Telegram's markdown is weird
  sendToPlayer = async (playerId: number, ctx: Context) => {
    const player = getPlayerOrThrow(playerId);
    const chatId = ctx.chatId;
    if (!player || !chatId) return;
    const compiledPoem = this.compile();
    const keyboard = new InlineKeyboard().text(
      "Show Metadata",
      encodeCallbackData(CallbackWithData.SHOW_POEM_META, { id: this.id }),
    );
    await ctx.api.sendMessage(player.id, compiledPoem, {
      parse_mode: "HTML",
      reply_markup: keyboard,
    });
  };

  setMessageId = (id: number) => {
    this.messageId = id;
  };
}
