import { Player } from "classes";
import { stateKeyboardButtonMap } from "const";
import { MessagingState } from "types";

export const getKeyboardButtons = (state: MessagingState, player: Player) => {
  const btnsFn = stateKeyboardButtonMap[state];
  return btnsFn?.(player);
};
