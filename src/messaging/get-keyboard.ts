import { InlineKeyboard, Keyboard } from "grammy";
import { Player } from "classes";
import { stateKeyboardButtonMap } from "const";
import { addTestingKeyboardButtons } from "handlers";
import {
  BasicCallback,
  CallbackButton,
  Context,
  MessagingState,
  PlayerState,
} from "types";
import { addHiddenCharacter } from "utils";

const inlineKeyboardStates: MessagingState[] = [
  PlayerState.VIEWING_ARCHIVED_POEM,
];

export const getKeyboardForState = (
  player: Player,
  state: MessagingState,
  ctx: Context
) => {
  const useInlineKeyboard = inlineKeyboardStates.includes(state);
  const keyboard = useInlineKeyboard
    ? new InlineKeyboard()
    : new Keyboard().oneTime();

  const btnsFn = stateKeyboardButtonMap[state];
  if (!btnsFn) {
    return undefined;
  }
  const buttons = btnsFn(player);

  for (const button of buttons) {
    if (useInlineKeyboard) {
      const { label, callback } = button as CallbackButton;
      keyboard.text(label ?? "missing button label", callback);
    } else {
      keyboard.text(addHiddenCharacter(button as string));
    }
    keyboard.row();
  }

  if (player.isInGame() && player.state !== PlayerState.TRYING_LEAVE) {
    keyboard.text(addHiddenCharacter(BasicCallback.TRY_LEAVE));
  }

  if (process.env.TESTING) {
    addTestingKeyboardButtons(keyboard);
  }

  return keyboard;
};
