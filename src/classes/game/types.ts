import { Context, PlayerState } from "types";
import { Player } from "../player";

type BasicArgs = { ctx: Context; players: Player[] };
type BasicFromArgs = { ctx: Context; fromPlayerId: number; players: Player[] };

type StateArgs = BasicArgs & {
  customMessage?: string;
  noMessage?: boolean;
  state: PlayerState | null;
};
type StateFromArgs = BasicArgs & {
  customMessage?: string;
  fromPlayerId: number;
  noMessage?: boolean;
  state: PlayerState | null;
};

export type AllFn = (args: BasicArgs) => Promise<void>;
export type OthersFn = (args: BasicFromArgs) => Promise<void>;

export type AllStateFn = (args: StateArgs) => Promise<void>;
export type OthersStateFn = (args: StateFromArgs) => Promise<void>;
