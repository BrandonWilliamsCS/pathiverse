import { Action } from "../Action";

/**
 * Applies an action to an initial state to produce a new state.
 * Named for the functional "reduce" pattern.
 * @typeParam S - describes possible values for states.
 */
export type StateReducer<S> = (state: S, action: Action) => S;
