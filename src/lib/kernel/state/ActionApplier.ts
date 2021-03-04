import { StateCapsule } from "./StateCapsule";

/**
 * Applies an action to some kind of closed-over state to produce a new state capsule.
 * @typeParam S - describes possible values for states.
 * @typeParam A - describes possible actions.
 */
export type ActionApplier<S, A> = (action: A) => Promise<StateCapsule<S, A>>;
