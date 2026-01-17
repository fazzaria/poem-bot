import { UNKNOWN_ERROR } from "const";
import { BotError, GrammyError, HttpError } from "grammy";
import { Context } from "types";

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
  ctx.reply(`${message || UNKNOWN_ERROR}\n\nUse /start to reset.`);
};
