import { Player } from "classes";

export const forPlayers = async (
  players: Player[],
  callback: (player: Player) => Promise<void>,
) => {
  await Promise.all(
    players.map(async (player) => {
      try {
        await callback(player);
      } catch (err) {
        console.error(`Error on iterate players helper`, err);
      }
    }),
  );
};
