import { Player } from "classes";
import { stateMessageMap } from "const";
import { MessagingState } from "types";

export const getMessageForState = (player: Player, state: MessagingState) => {
  const messageFn = stateMessageMap[state];
  if (!messageFn) {
    return "";
  }
  return messageFn(player);
};
