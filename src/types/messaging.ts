import { InlineKeyboard, Keyboard as GrammyKeyboard } from "grammy";
import { Callback, ConversationState, GameConfigCallback } from "./handlers";
import { PlayerState } from "./player-state";

export type MessagingState = PlayerState | ConversationState;

export type CallbackButton = {
  label?: string;
  callback: Callback | GameConfigCallback;
  continueRow?: boolean;
};

export type Keyboard = GrammyKeyboard | InlineKeyboard;
