import { getContextPlayerOrThrow, getGameOrThrow, getGames } from "data";
import { messagePlayer } from "messaging";
import { setPlayerState } from "player-state";
import {
  BasicCallback,
  ConversationFn,
  ConversationState,
  PlayerState,
} from "types";
import { getConversationValue } from "utils";

export const gameDescriptionConversation: ConversationFn = async (
  conversation,
  ctx
) => {
  const player = getContextPlayerOrThrow(ctx);
  const game = getGameOrThrow(player.gameId);

  await getConversationValue(conversation, {
    exitCallback: BasicCallback.RETURN_TO_PREVIOUS_STATE,
    doEach: async () =>
      await messagePlayer(
        player.id,
        ConversationState.GET_GAME_DESCRIPTION,
        ctx
      ),
    handleCancel: async () => {
      await setPlayerState(player.id, ctx, PlayerState.SETTING_UP_GAME);
    },
    handleSuccess: async (description: string) => {
      game.setOptions({ description });
      await setPlayerState(player.id, ctx, PlayerState.SETTING_UP_GAME);
      return;
    },
    validate: async (description: string) => {
      return true;
    },
  });
};
