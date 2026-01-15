import {
  archivedPoemConversation,
  gameDescriptionConversation,
  gameIdConversation,
  nextLineConversation,
} from "handlers";
import { ConversationState, ConversationFn } from "types";

export const conversationHandlerMap: {
  [key in ConversationState]: ConversationFn;
} = {
  [ConversationState.GET_ARCHIVED_POEM]: archivedPoemConversation,
  [ConversationState.GET_GAME_DESCRIPTION]: gameDescriptionConversation,
  [ConversationState.GET_GAME_ID]: gameIdConversation,
  [ConversationState.GET_NEXT_LINE]: nextLineConversation,
};
