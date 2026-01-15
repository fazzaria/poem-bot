import { Game, Player, Poem } from "classes";
import { PlayerState } from "./player-state";

export type Line = { author: string; date: string; text: string };

export type PoemProps = { gameId: string; id: number; lines: Line[] };

export type PoemOverrides = Partial<PoemProps> & { gameId: string };

export enum GameOption {
  DESCRIPTION = "description",
}

export type GameOptions = {
  [GameOption.DESCRIPTION]?: string;
};

export type GameProps = GameOptions & {
  currentWriterId?: number;
  destroy: (id: string) => void;
  gameId?: string;
  hostId: number;
  id: string;
  inProgress: boolean;
  options: GameOptions;
  poem: Poem;
  playerIds: number[];
};

export type GameOverrides = Partial<GameProps> & {
  poemProps?: Partial<PoemProps>;
};

export type PlayerProps = {
  activeMessageId: number;
  destroy: (id: number) => void;
  gameId?: string;
  id: number;
  notification?: string;
  userName: string;
  simulated?: boolean;
  state: PlayerState;
};

export type PlayerOverrides = Partial<PlayerProps> & {
  id: number;
  userName: string;
};

export type Games = Record<string, Game>;

export type Players = { [userId: number]: Player };

export type ArchivedPoems = { [id: string]: Poem };

export type GlobalProps = {
  activePlayers: Players;
  games: Games;
  archivedPoems: ArchivedPoems;
};
