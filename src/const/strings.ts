import { Game, Player } from "classes";
import { GameOption } from "types";

export const MY_USERNAME = `${process.env.MY_USERNAME}`;
export const PLS_REPORT = `Please let ${MY_USERNAME} know.`;
export const BOT_NAME = "JOLB";
export const BOT_RUNNING = `${BOT_NAME} is now running.`;
export const FALLBACK_USERNAME = "User";
export const GAME_NOT_FOUND = "Game not found.";
export const GAME_NOT_FOUND_WITH_ID = (id: string) =>
  `Game not found with id ${id}.`;
export const HAS_JOINED = (name: string) => `${name} has joined the game.`;
export const HAS_LEFT = (name: string) => `${name} has left the game.`;
export const HIDE_SHOW_METADATA = (show?: boolean) =>
  `${show ? "Hide" : "Show"} Metadata`;
export const HOST_LEFT =
  "The host has left the game. Returning to start screen...";
export const HOST_RESTARTED = `The host has restarted the game.`;
export const MISSING_BUTTON_LABEL = "Missing button label.";
export const NO_BOTS_PLS = "No bots pls.";
export const ONLY_HOST_CAN_START = "Only the host can start the game.";
export const PLAYER_NOT_FOUND = "Player not found.";
export const POEM_NOT_FOUND = "Poem not found.";
export const POEM_NOT_FOUND_WITH_ID = (id: number) =>
  `Poem not found with id ${id}.`;
export const USER_NOT_FOUND = "User not found.";
export const RETRIEVE_FROM_ARCHIVE = (id: number) => `(Poem ID: ${id})`;
export const UNKNOWN_ERROR = "An unknown error occurred.";
export const VALIDATION_POEM_ID_IS_NUMBER = "Poem id must be a number.";
export const WELCOME_TO_ARCHIVES = "Welcome to the archives!";

// player state messages
export const LOBBY_MESSAGE = (
  players: Player[],
  game: Game,
  isHost: boolean
) => {
  const description = game.options[GameOption.DESCRIPTION];
  let message = `Welcome to the game!\n\n`;
  if (description) {
    message += `Description: ${description ? `${description}\n\n` : ""}`;
  }
  message += `Players in lobby:\n\n${players
    .map((player) => {
      return `- ${player.userName}${
        player.id === game.hostId ? " (host)" : ""
      }`;
    })
    .join("\n")}\n\n`;
  if (!isHost) {
    message += "Waiting for host to start game.\n\n";
  }
  message += `Invite others with game code ${game?.id}.`;
  return message;
};
export const POST_GAME_MESSAGE = ``;
export const READY_TO_WRITE_MESSAGE = ``;
export const SETTING_UP_GAME_MESSAGE = ``;
export const SPECTATING_MESSAGE = ``;
export const START_MESSAGE = ``;
export const TRYING_LEAVE_MESSAGE = ``;
export const TYPING_MESSAGE = ``;
export const VIEWING_ARCHIVED_POEM_MESSAGE = ``;
export const WAITING_AFTER_WRITING_MESSAGE = ``;
export const WAITING_TO_WRITE_MESSAGE = ``;
