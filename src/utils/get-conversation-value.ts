import { Conversation } from "types";
import { encodeCallbackName } from "./callback-name-encoding";

export const getConversationValue = async (
  conversation: Conversation,
  {
    exitCallback: pExitcallbacks = [],
    ignoreCallbacks: pIgnoreCallbacks = [],
    handleCancel,
    handleSuccess,
    stay,
    doEach,
    validate,
  }: {
    exitCallback: string | string[];
    ignoreCallbacks?: string[];
    handleSuccess: (val: string) => Promise<void>;
    handleCancel?: () => Promise<void>;
    stay?: boolean;
    doEach?: () => Promise<void>;
    validate?: (val: string) => Promise<boolean>;
  },
) => {
  const exitCallbacks =
    typeof pExitcallbacks === "string"
      ? [encodeCallbackName(pExitcallbacks)]
      : pExitcallbacks.map(encodeCallbackName);
  const ignoreCallbacks = pIgnoreCallbacks.map(encodeCallbackName);

  while (true) {
    await doEach?.();

    const result = await conversation.waitFor("message:text");
    const message = result.message.text;

    if (exitCallbacks.includes(message)) {
      await handleCancel?.();
      return;
    }

    if (!ignoreCallbacks.includes(message)) {
      if (!validate || (await validate?.(message))) {
        await handleSuccess(message);
        if (!stay) return;
      }
    }
  }
};
