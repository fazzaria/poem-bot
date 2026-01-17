import { inspoRepo } from "const";
import { getContextPlayerOrCreate } from "data";
import { HandlerFn } from "types";

export const inspoHandler: HandlerFn = async (ctx) => {
  const player = getContextPlayerOrCreate(ctx);
  const inspo = inspoRepo[Math.floor(Math.random() * inspoRepo.length)];
  await ctx.api.sendMessage(player.id, inspo, { parse_mode: "MarkdownV2" });
};
