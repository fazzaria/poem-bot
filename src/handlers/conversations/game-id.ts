import { GAME_NOT_FOUND_WITH_ID } from "const";
import {
  getContextPlayerOrThrow,
  getGame,
  getGameOrThrow,
  joinGame,
} from "data";
import { messagePlayer } from "messaging";
import { setPlayerState } from "player-state";
import {
  BasicCallback,
  ConversationFn,
  ConversationState,
  PlayerState,
} from "types";
import { getConversationValue } from "utils";

export const gameIdConversation: ConversationFn = async (conversation, ctx) => {
  const player = getContextPlayerOrThrow(ctx);
  await getConversationValue(conversation, {
    exitCallback: BasicCallback.RETURN_TO_PREVIOUS_STATE,
    doEach: async () => {
      await messagePlayer(player.id, ConversationState.GET_GAME_ID, ctx);
    },
    handleCancel: async () => {
      await setPlayerState(player.id, ctx, PlayerState.START);
      return;
    },
    handleSuccess: async (gameId: string) => {
      const game = getGameOrThrow(gameId);
      await joinGame(ctx, game, player);
      return;
    },
    validate: async (gameId: string) => {
      const game = getGame(gameId);
      if (game) {
        return true;
      }
      await messagePlayer(
        player.id,
        player.state,
        ctx,
        GAME_NOT_FOUND_WITH_ID(gameId),
      );
      return false;
    },
  });
};
