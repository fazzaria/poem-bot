import { Keyboard } from "grammy";
import { Player } from "classes";
import { stateKeyboardButtonMap } from "const";
import { BasicCallback, MessagingState, PlayerState } from "types";
import { encodeCallbackName } from "utils";

export const getKeyboardForState = (player: Player, state: MessagingState) => {
  const keyboard = new Keyboard().oneTime();

  const btnsFn = stateKeyboardButtonMap[state];
  if (!btnsFn) {
    return undefined;
  }
  const buttons = btnsFn(player);

  for (const button of buttons) {
    keyboard.text(encodeCallbackName(button as string));
    keyboard.row();
  }

  if (player.isInGame() && player.state !== PlayerState.TRYING_LEAVE) {
    keyboard.text(encodeCallbackName(BasicCallback.TRY_LEAVE));
  }

  return keyboard;
};
