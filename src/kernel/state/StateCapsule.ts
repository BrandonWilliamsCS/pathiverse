import { ActionApplier } from "./ActionApplier";

/**
 * Pairs a state value and the function that generates a new, iterative state capsule based on action.
 * @typeParam S - describes possible values for states.
 */
export type StateCapsule<S> = [state: S, actionApplier: ActionApplier<S>];
