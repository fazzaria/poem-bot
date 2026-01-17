import {
  ArchivedPoems,
  Context,
  GameOverrides,
  Games,
  GlobalProps,
  PlayerOverrides,
  Players,
} from "types";
import { Game } from "../game";
import { Player } from "../player";
import { Poem } from "classes/poem";

export class Global {
  activePlayers: Players;
  games: Games;
  archivedPoems: ArchivedPoems;

  constructor(overrides?: Partial<GlobalProps>) {
    const { activePlayers, games, archivedPoems } = overrides ?? {};
    this.activePlayers = activePlayers ?? {};
    this.games = games ?? {};
    this.archivedPoems = archivedPoems ?? {};
  }

  addGame = (overrides: GameOverrides = {}) => {
    const newGame = new Game({ ...overrides, destroy: this.deleteGame });
    this.games[newGame.id] = newGame;
    return newGame;
  };

  addPlayer = (overrides: PlayerOverrides) => {
    const newPlayer = new Player({ ...overrides, destroy: this.deletePlayer });
    this.activePlayers[newPlayer.id] = newPlayer;
    return newPlayer;
  };

  deleteGame = (id: string = "") => {
    delete this.games[id];
  };

  deletePlayer = (id: number) => {
    delete this.activePlayers[id];
  };

  getGame = (id: string = ""): Game | undefined => {
    return this.games[id];
  };

  getGames = () => {
    return this.games;
  };

  getPlayer = (id: number): Player | undefined => {
    return this.activePlayers[id];
  };

  getPlayers = (ids: number[]) => {
    return ids.map((id) => this.activePlayers[id]).filter((player) => !!player);
  };

  joinGame = async (
    ctx: Context,
    game: Game,
    player: Player,
    newGame?: boolean,
  ) => {
    if (player.gameId === game.id) {
      throw new Error("You are already in this game.");
    }
    await game.addPlayer(player.id, ctx);
    await player.joinGame(ctx, game.id, newGame);
  };

  leaveGame = async (ctx: Context, game: Game, player: Player) => {
    await player.leaveGame(ctx);
    await game.removePlayer(player, ctx);
  };

  addArchivedPoem = (poem: Poem) => {
    this.archivedPoems[poem.id] = poem;
  };

  getArchivedPoem = (id: string = ""): Poem | undefined => {
    return this.archivedPoems[id];
  };

  getArchivedPoems = () => {
    return this.archivedPoems;
  };

  clearMemory = () => {
    this.activePlayers = [];
    this.games = {};
    this.archivedPoems = {};
  };
}
