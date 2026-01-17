import { ParseMode } from "grammy/types";
import { getPlayerOrThrow } from "data";
import { Context, MessagingState } from "types";
import { getSanitizedMessage } from "./format-message";
import { getMessageForState } from "./get-message";
import { getKeyboardForState } from "./get-keyboard";
import { getReplyMarkup } from "utils";

export const messagePlayer = async (
  playerId: number,
  state: MessagingState,
  ctx: Context,
  customString = "",
) => {
  const player = getPlayerOrThrow(playerId);
  const stateMessage = customString || getMessageForState(player, state);
  if (!stateMessage) return;
  const keyboard = getKeyboardForState(player, state);

  const formattedMessage = getSanitizedMessage(stateMessage);

  const replyMarkup = getReplyMarkup({ keyboard, player, state });

  try {
    await ctx.api.sendMessage(player.id, formattedMessage, {
      parse_mode: "MarkdownV2" as ParseMode,
      reply_markup: replyMarkup,
    });
  } catch (error) {
    console.log(error);
  }
};
