import { ParseMode } from "grammy/types";
import { getPlayerOrThrow } from "data";
import { Context, MessagingState } from "types";
import { messageWithNotification } from "./format-message";
import { getMessageForState } from "./get-message";
import { getKeyboardForState } from "./get-keyboard";
import { chatNotFound } from "utils";

export const messagePlayer = async (
  playerId: number,
  state: MessagingState,
  ctx: Context
) => {
  const player = getPlayerOrThrow(playerId);
  const stateMessage = getMessageForState(player, state);
  if (!stateMessage) return;
  const keyboard = getKeyboardForState(player, state, ctx);
  const { notification } = player;

  const formattedMessage = messageWithNotification(stateMessage, notification);

  try {
    await ctx.api.sendMessage(player.id, formattedMessage, {
      parse_mode: "MarkdownV2" as ParseMode,
      reply_markup: keyboard,
    });
  } catch (error) {
    if (chatNotFound(error as any)) return;
    console.log((error as any)?.description);
    console.log(error);
  }
};
