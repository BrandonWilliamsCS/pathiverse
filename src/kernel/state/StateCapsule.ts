import { ActionApplier } from "./ActionApplier";

/**
 * Pairs a state value and the function that generates a new, iterative state capsule based on action.
 * @typeParam S - describes possible values for states.
 * @typeParam A - describes possible actions.
 */
export type StateCapsule<S, A> = [state: S, actionApplier: ActionApplier<S, A>];
