import { PlayerState, StateConfig } from "types";
import { defaultState } from "./default";
import { lobbyState } from "./lobby";
import { settingUpGameState } from "./setting-up-game";
import { spectatingState } from "./spectating";
import { waitingAfterWritingState } from "./waiting-after-writing";
import { waitingToWriteState } from "./waiting-to-write";
import { typingState } from "./typing";
import { tryingLeaveState } from "./trying-leave";
import { postGameState } from "./post-game";
import { viewingArchivedPoemState } from "./viewing-archived-poem";
import { writingState } from "./writing";
import { inArchivesState } from "./in-archives";

export const stateRegistry: { [key in PlayerState]: StateConfig } = {
  [PlayerState.IN_ARCHIVES]: inArchivesState,
  [PlayerState.LOBBY]: lobbyState,
  [PlayerState.SETTING_UP_GAME]: settingUpGameState,
  [PlayerState.SPECTATING]: spectatingState,
  [PlayerState.POST_GAME]: postGameState,
  [PlayerState.WRITING]: writingState,
  [PlayerState.START]: defaultState,
  [PlayerState.TRYING_LEAVE]: tryingLeaveState,
  [PlayerState.TYPING]: typingState,
  [PlayerState.VIEWING_ARCHIVED_POEM]: viewingArchivedPoemState,
  [PlayerState.WAITING_AFTER_WRITING]: waitingAfterWritingState,
  [PlayerState.WAITING_TO_WRITE]: waitingToWriteState,
};
