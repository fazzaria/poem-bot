import { Player } from "classes";
import { stateKeyboardButtonMap } from "const";
import {
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  ForceReply,
} from "grammy/types";
import { Keyboard, MessagingState } from "types";
import { encodeCallbackName } from "./callback-name-encoding";

type ReplyMarkup =
  | InlineKeyboardMarkup
  | ReplyKeyboardMarkup
  | ReplyKeyboardRemove
  | ForceReply
  | undefined;

// TODO. It seems that "force_reply" does not behave with keyboards, so users will manually click and reply for now until a workaround is found
const forceReplyStates: MessagingState[] = [
  /* PlayerState.WRITING */
];
const endForceReplyStates: MessagingState[] = [
  /*  PlayerState.WAITING_AFTER_WRITING,
  PlayerState.POST_GAME, */
];

export const getReplyMarkup = ({
  keyboard,
  player,
  state,
}: {
  keyboard?: Keyboard;
  player: Player;
  state: MessagingState;
}): ReplyMarkup => {
  const forceReply = forceReplyStates.includes(state);
  const endForceReply = endForceReplyStates.includes(state);
  const btnFn = stateKeyboardButtonMap[state];
  const buttons = btnFn ? [btnFn(player).map(encodeCallbackName)] : [];

  if (forceReply) {
    return { keyboard: buttons, force_reply: true, one_time_keyboard: true };
  }

  if (endForceReply) {
    return {
      remove_keyboard: true,
      keyboard: buttons,
    };
  }

  if (keyboard) {
    return keyboard;
  }

  return keyboard;
};
