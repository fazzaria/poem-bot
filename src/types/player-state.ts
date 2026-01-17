import { Menu } from "@grammyjs/menu";
import { Player } from "classes";
import { Context } from "./server";

export enum PlayerState {
  IN_ARCHIVES = "ARCHIVES",
  LOBBY = "LOBBY",
  POST_GAME = "POST_GAME",
  SETTING_UP_GAME = "SETTING_UP_GAME",
  SPECTATING = "SPECTATING",
  START = "START",
  TRYING_LEAVE = "TRYING_LEAVE",
  TYPING = "TYPING",
  VIEWING_ARCHIVED_POEM = "VIEWING_ARCHIVED_POEM",
  WAITING_AFTER_WRITING = "WAITING_AFTER_WRITING",
  WAITING_TO_WRITE = "WAITING_TO_WRITE",
  WRITING = "WRITING",
}

export type StateManagementFn = (player: Player) => Promise<void>;

export type StateConfig = {
  enter: StateManagementFn;
  exit: StateManagementFn;
};

export type MenuType = Menu<Context>;
