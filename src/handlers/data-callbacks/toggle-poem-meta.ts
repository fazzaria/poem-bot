import { HIDE_SHOW_METADATA, POEM_NOT_FOUND } from "const";
import { getArchivedPoem } from "data";
import { InlineKeyboard } from "grammy";
import { CallbackWithData, Context, HandlerFn } from "types";
import { encodeCallbackData } from "utils";

type PoemID = { id: string };

const togglePoemMeta = async (
  ctx: Context,
  data: PoemID,
  includeMeta?: boolean,
) => {
  const poem = getArchivedPoem(data.id);
  const keyboard = new InlineKeyboard().text(
    HIDE_SHOW_METADATA(includeMeta),
    encodeCallbackData(
      includeMeta
        ? CallbackWithData.HIDE_POEM_META
        : CallbackWithData.SHOW_POEM_META,
      data,
    ),
  );
  try {
    const compiledPoem = poem?.compile(includeMeta);
    if (compiledPoem) {
      ctx.editMessageText(compiledPoem ?? POEM_NOT_FOUND, {
        parse_mode: "HTML",
        reply_markup: keyboard,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const showPoemMetaHandler: HandlerFn = async (ctx, data: PoemID) => {
  await togglePoemMeta(ctx, data, true);
};

export const hidePoemMetaHandler: HandlerFn = async (ctx, data: PoemID) => {
  await togglePoemMeta(ctx, data);
};
