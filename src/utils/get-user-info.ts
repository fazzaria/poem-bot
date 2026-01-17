import {
  FALLBACK_USERNAME,
  NO_BOTS_PLS,
  UNKNOWN_ERROR,
  USER_NOT_FOUND,
} from "const";
import { Context } from "types";

export const getUserInfo = (ctx: Context) => {
  if (!ctx.from) throw new Error(UNKNOWN_ERROR);
  if (ctx.from.is_bot) throw new Error(NO_BOTS_PLS);
  const id = ctx.from.id;
  if (!id) throw new Error(USER_NOT_FOUND);
  const name = ctx.from.first_name || FALLBACK_USERNAME;
  return { userId: id, userName: name };
};
