import { StateConfig, StateManagementFn } from "types";

const enter: StateManagementFn = async (player) => {};

const exit: StateManagementFn = async (player) => {};

export const defaultState: StateConfig = { enter, exit };
