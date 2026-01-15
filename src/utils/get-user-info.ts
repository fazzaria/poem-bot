import { Context } from "types";

export const getUserInfo = (ctx: Context) => {
  if (!ctx.from) throw new Error("An unknown error occurred.");
  if (ctx.from.is_bot) throw new Error("No bots pls.");
  const id = ctx.from.id;
  if (!id) throw new Error("User not found.");
  const name = ctx.from.username || "User";
  return { userId: id, userName: name };
};
