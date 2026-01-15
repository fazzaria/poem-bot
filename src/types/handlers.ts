import {
  Conversation as GrammyConversation,
  ConversationFlavor,
} from "@grammyjs/conversations";
import { Player } from "classes";
import { Context } from "./server";

export enum BasicCallback {
  BEGIN_GAME = "Start Game",
  CREATE_GAME = "Create Game",
  LEAVE_GAME = "Leave",
  RESTART_APP = "Restart",
  RESTART_GAME = "Play Again?",
  RETURN_TO_PREVIOUS_STATE = "Cancel",
  SET_UP_GAME = "New Game",
  TRY_JOIN = "Join Game",
  TRY_LEAVE = "Leave Game",
  VIEW_ARCHIVED_POEMS = "View Archived Poems",
}

export enum CallbackWithData {
  HIDE_POEM_META = "HIDE_POEM_META",
  SHOW_POEM_META = "SHOW_POEM_META",
}

export enum GameConfigCallback {
  ADD_DESCRIPTION = "Add Description",
  EDIT_DESCRIPTION = "Edit Description",
  REMOVE_DESCRIPTION = "Delete Description",
}

export type Callback = BasicCallback | GameConfigCallback;

export enum Command {
  INSPO = "inspo",
  START = "start",
}

export enum ConversationState {
  GET_ARCHIVED_POEM = "GET_ARCHIVED_POEM",
  GET_GAME_DESCRIPTION = "GET_GAME_DESCRIPTION",
  GET_GAME_ID = "GET_GAME_ID",
  GET_NEXT_LINE = "GET_NEXT_LINE",
}

export type Conversation = GrammyConversation<
  ConversationFlavor<Context>,
  ConversationFlavor<Context>
>;

export type ConversationFn = (
  conversation: Conversation,
  ctx: ConversationFlavor<Context>,
  player: Player
) => Promise<any>;
