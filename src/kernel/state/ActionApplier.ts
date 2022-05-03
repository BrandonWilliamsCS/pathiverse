import { Action } from "kernel/Action";
import { StateCapsule } from "./StateCapsule";

/**
 * Applies an action to some kind of closed-over state to produce a new state capsule.
 * @typeParam S - describes possible values for states.
 */
export type ActionApplier<S> = (action: Action) => Promise<StateCapsule<S>>;
