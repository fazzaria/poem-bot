import { StateConfig, StateManagementFn } from "types";

const enter: StateManagementFn = async (player, ctx) => {};

const exit: StateManagementFn = async (player, ctx) => {};

export const waitingAfterWritingState: StateConfig = { enter, exit };
