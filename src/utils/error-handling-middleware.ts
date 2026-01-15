import { BotError, GrammyError, HttpError, InlineKeyboard } from "grammy";
import { BasicCallback, Context } from "types";

export const errorHandlingMiddleware = (err: BotError<Context>) => {
  const ctx = err.ctx;
  const e = err.error;
  let message = "";
  console.log(e);
  if (e instanceof GrammyError) {
    message = `Error in request: ${e.description}`;
  } else if (e instanceof HttpError) {
    message = `Could not contact Telegram: ${e}`;
  } else if (err.message) {
    message = err.message;
  } else {
    console.error(e);
  }
  if (message) {
    ctx.reply(message, {
      reply_markup: new InlineKeyboard().text(
        "Reset",
        BasicCallback.RESTART_APP
      ),
    });
  }
};
