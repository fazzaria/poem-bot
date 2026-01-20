import { StateConfig, StateManagementFn } from "types";

const enter: StateManagementFn = async (_player) => {};

const exit: StateManagementFn = async (_player) => {};

export const typingState: StateConfig = { enter, exit };
