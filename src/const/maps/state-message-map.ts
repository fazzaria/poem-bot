import { Player } from "classes";
import { BOT_NAME, LOBBY_MESSAGE } from "const/strings";
import { getGameOrThrow } from "data";
import {
  ConversationState,
  GameOption,
  MessagingState,
  PlayerState,
} from "types";
import { randomStarDecorator } from "utils";

export const stateMessageMap: {
  [key in MessagingState]: ((player: Player) => string) | null;
} = {
  // player state messages
  [PlayerState.IN_ARCHIVES]: (player) => {
    // on first search
    if (player.previousState === PlayerState.START) {
      // TODO use force reply or refactor conversation to make this easier
      return `Welcome to the archives! Poems completed in games are stored here with 4-digit ids. Reply to this message (tap and press "Reply") with a poem id to re-read it.`;
    }
    // on subsequent actions
    return `Enter another poem id to search, or click the "Exit Archive" button to return to the start page.`;
  },
  [PlayerState.LOBBY]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const players = game.getPlayers();
    const isHost = player.isHost();

    return LOBBY_MESSAGE(players, game, isHost);
  },
  [PlayerState.POST_GAME]: (player) => {
    return `Poem finished! Here's what you all came up with:`;
  },
  [PlayerState.WRITING]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const firstPlayer = !game.poem.lines.length;
    const lastPlayer = !game.getEligiblePlayers().length;
    // TODO use force reply or refactor conversation to make this easier
    let message = `It's your turn! ${randomStarDecorator()}\n\nReply to this message (tap and press "Reply") with your line of poetry.\n\n`;
    if (firstPlayer && lastPlayer) {
      ("You're writing the only line, I guess!!");
    } else {
      if (firstPlayer) message += `You're writing the first line!`;
      if (lastPlayer) message += `You're writing the last line!`;
    }
    return message;
  },
  [PlayerState.SETTING_UP_GAME]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const description = game?.options[GameOption.DESCRIPTION];
    return `Use the buttons below to configure your game. (More configuration options TBD). Press "Create Game" when ready.${
      description ? `\n\nGame Description: ${description}` : ""
    }`;
  },
  [PlayerState.SPECTATING]: (player) => {
    const game = getGameOrThrow(player.gameId);
    let message =
      "This game is in progress, so you are spectating until the current round is over. ";
    if (game.poem.completed) {
      message +=
        "Players are viewing a completed poem and waiting for the host to return to the lobby.";
    } else {
      const eligiblePlayersRemaining = game.getEligiblePlayers().length + 1;
      const oneRemaining = eligiblePlayersRemaining === 1;
      message += `There ${
        oneRemaining ? "is" : "are"
      } ${eligiblePlayersRemaining} more player${oneRemaining ? "" : "s"} to go.`;
    }
    return message;
  },
  [PlayerState.START]: (player) =>
    `Welcome to ${BOT_NAME}!\n\nThe game is simple: your group will write a poem one line at a time. However, each person only gets to see the line written by the person before them, leading to chaos and streams-of-consciousness.\n\nHit one of the buttons below to get started.`,
  [PlayerState.TRYING_LEAVE]: (player) => {
    return `Are you sure you want to leave the game?${player.isHost() ? " Since you are the host, this will end the game for all players." : ""}`;
  },
  [PlayerState.TYPING]: null,
  [PlayerState.VIEWING_ARCHIVED_POEM]: (player) => {
    return "viewing archived poem state";
  },
  [PlayerState.WAITING_AFTER_WRITING]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const totalEligible = game.getEligiblePlayers().length;
    const eligiblePlayersRemaining = totalEligible || 1;
    const oneRemaining = eligiblePlayersRemaining === 1;
    return `There ${
      oneRemaining ? "is" : "are"
    } ${eligiblePlayersRemaining} more player${oneRemaining ? "" : "s"} to go.`;
  },
  [PlayerState.WAITING_TO_WRITE]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const eligiblePlayers = game.getEligiblePlayers();
    const oneRemaining = eligiblePlayers.length === 1;
    const playerPosition =
      eligiblePlayers.findIndex(
        (eligiblePlayer) => eligiblePlayer.id === player.id,
      ) + 1;
    const playerIsNext = playerPosition === 1;
    const nextUpAlert = playerIsNext ? `Your turn is next!` : "";
    const queueStatus = `There ${
      oneRemaining ? "is" : "are"
    } now ${playerPosition} player${oneRemaining ? "" : "s"} ahead of you.`;
    return `Waiting to write. ${nextUpAlert || queueStatus}`;
  },
  // conversation state messages
  [ConversationState.GET_GAME_DESCRIPTION]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const description = game?.options[GameOption.DESCRIPTION];
    return `Add a description for your game (a writing prompt, a greeting, or anything else).${
      description ? `\n\nCurrent Description: ${description}` : ""
    }`;
  },
  [ConversationState.GET_ARCHIVED_POEM]: (player) =>
    "Enter the id of the poem to check out.",
  [ConversationState.GET_GAME_ID]: () => "Enter a 4-character game ID.",
};
