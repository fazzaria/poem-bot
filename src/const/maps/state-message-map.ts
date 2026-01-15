import { Player } from "classes";
import { getGameOrThrow } from "data";
import {
  ConversationState,
  GameOption,
  MessagingState,
  PlayerState,
} from "types";

export const stateMessageMap: {
  [key in MessagingState]: ((player: Player) => string) | null;
} = {
  // player state messages
  [PlayerState.LOBBY]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const players = game.getPlayers();
    const hosting = player.isHost();

    const playerList = `Players in lobby:\n\n${players
      .map((player) => {
        return `- ${player.userName}${
          player.id === game.hostId ? " (host)" : ""
        }`;
      })
      .join("\n")}`;

    return `${playerList}\n\n${
      hosting ? "" : "Waiting for host to start game. "
    }Invite others with game code \`${game?.id}\`!`;
  },
  [PlayerState.POST_GAME]: (player) => {
    return "post game state";
  },
  [PlayerState.SETTING_UP_GAME]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const description = game?.options[GameOption.DESCRIPTION];
    return `Use the buttons below to configure your game. Press "Create Game" when ready.${
      description ? `\n\nGame Description: ${description}` : ""
    }`;
  },
  [PlayerState.SPECTATING]: (player) => {
    const game = getGameOrThrow(player.gameId);
    return `Spectating. Game code ${game?.id}`;
  },
  [PlayerState.START]: (player) =>
    `Welcome to name placeholder! This is a game where you write a poem with the girlies one line at a time - the twist is that you can only see the line the person right before you wrote. Hit one of the buttons below to get started.`,
  [PlayerState.TRYING_LEAVE]: (player) => {
    return `Are you sure you want to leave the game?`;
  },
  [PlayerState.TYPING]: null,
  [PlayerState.VIEWING_ARCHIVED_POEM]: (player) => {
    return "viewing archived poem state";
  },
  [PlayerState.WAITING_AFTER_WRITING]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const eligiblePlayersRemaining = game.getEligiblePlayers().length;
    const oneRemaining = eligiblePlayersRemaining === 1;
    return `Your line has been added to the poem. There ${
      oneRemaining ? "is" : "are"
    } ${eligiblePlayersRemaining} more player${oneRemaining ? "s" : ""} to go.`;
  },
  [PlayerState.WAITING_TO_WRITE]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const eligiblePlayers = game.getEligiblePlayers();
    const playerPosition = eligiblePlayers.findIndex(
      (eligiblePlayer) => eligiblePlayer.id === player.id
    );
    const turnInfo =
      playerPosition === 0
        ? `Your turn is next!`
        : `There are ${playerPosition + 1} players ahead of you.`;
    return `Waiting to write. ${turnInfo}`;
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
  [ConversationState.GET_NEXT_LINE]: (player) => {
    const game = getGameOrThrow(player.gameId);
    const previousLine = game.poem.lines[game.poem.lines.length - 1];
    const eligiblePlayers = game.getEligiblePlayers();
    const writingFirstLine = game.poem.lines.length === 0;
    const writingLastLine =
      game.poem.lines.length === eligiblePlayers.length - 1;
    let message = "It's now your turn!";
    if (writingFirstLine) {
      message =
        "You're the first player! Send a line of original poetry to start the game off.";
    }
    if (writingLastLine) {
      message = "It's now your turn! You're writing the concluding line.";
    }
    if (previousLine) {
      message += `\n\nPrevious line: ${previousLine}`;
    }
    return message;
  },
};
