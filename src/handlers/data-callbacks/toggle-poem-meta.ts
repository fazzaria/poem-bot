import { getArchivedPoem } from "data";
import { InlineKeyboard } from "grammy";
import { CallbackWithData, Context, HandlerFn } from "types";
import { encodeCallbackData } from "utils";

type PoemID = { id: string };

const togglePoemMeta = async (
  ctx: Context,
  data: PoemID,
  includeMeta?: boolean
) => {
  const poem = getArchivedPoem(data.id);
  const keyboard = new InlineKeyboard().text(
    `${includeMeta ? "Hide" : "Show"} Metadata`,
    encodeCallbackData(
      includeMeta
        ? CallbackWithData.HIDE_POEM_META
        : CallbackWithData.SHOW_POEM_META,
      data
    )
  );
  try {
    ctx.editMessageText(poem?.compile(includeMeta) ?? "Poem not found.", {
      parse_mode: "HTML",
      reply_markup: keyboard,
    });
  } catch {}
};

export const showPoemMetaHandler: HandlerFn = async (ctx, data: PoemID) => {
  await togglePoemMeta(ctx, data, true);
};

export const hidePoemMetaHandler: HandlerFn = async (ctx, data: PoemID) => {
  await togglePoemMeta(ctx, data);
};
