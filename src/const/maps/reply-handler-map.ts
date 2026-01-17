import { writingReplyHandler } from "handlers";
import { archiveSearchHandler } from "handlers/replies/archive-search";
import { PlayerState, ReplyHandlerFn } from "types";

export const replyHandlerMap: { [key in PlayerState]?: ReplyHandlerFn } = {
  [PlayerState.IN_ARCHIVES]: archiveSearchHandler,
  [PlayerState.WRITING]: writingReplyHandler,
};
