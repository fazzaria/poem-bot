import { Conversation } from "types";
import { addHiddenCharacter } from "./safe-callback-name";

export const getConversationValue = async (
  conversation: Conversation,
  {
    exitCallback: pExitcallback,
    ignoreCallbacks: pIgnoreCallbacks = [],
    handleCancel,
    handleSuccess,
    doEach,
    validate,
  }: {
    exitCallback: string;
    ignoreCallbacks?: string[];
    handleSuccess: (val: string) => void;
    handleCancel?: () => void;
    doEach?: () => void;
    validate?: (val: string) => boolean;
  }
) => {
  const exitCallback = addHiddenCharacter(pExitcallback);
  const ignoreCallbacks = pIgnoreCallbacks.map((callback) =>
    addHiddenCharacter(callback)
  );
  while (true) {
    doEach?.();

    const result = await conversation.waitFor("message:text");
    const message = result.message.text;

    if (message === exitCallback) {
      handleCancel?.();
      return;
    }

    if (!ignoreCallbacks.includes(message)) {
      if (!validate || validate?.(message)) {
        handleSuccess(message);
        return;
      }
    }
  }
};
