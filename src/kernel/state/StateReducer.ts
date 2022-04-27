/**
 * Applies an action to an initial state to produce a new state.
 * Named for the functional "reduce" pattern.
 * @typeParam S - describes possible values for states.
 * @typeParam A - describes possible actions.
 */
export type StateReducer<S, A> = (state: S, action: A) => Promise<S>;
