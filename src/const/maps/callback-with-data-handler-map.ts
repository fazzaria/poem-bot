import { hidePoemMetaHandler, showPoemMetaHandler } from "handlers";
import { CallbackWithData, HandlerMap } from "types";

export const callbackWithDataHandlerMap: HandlerMap<CallbackWithData> = {
  [CallbackWithData.HIDE_POEM_META]: hidePoemMetaHandler,
  [CallbackWithData.SHOW_POEM_META]: showPoemMetaHandler,
};
