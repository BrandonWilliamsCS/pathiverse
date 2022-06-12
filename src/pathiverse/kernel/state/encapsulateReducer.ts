import { Action } from "../Action";
import { ActionApplier } from "./ActionApplier";
import { StateCapsule } from "./StateCapsule";
import { StateReducer } from "./StateReducer";

/**
 * Initiates a sequence of state reductions based on a deferred sequence of actions.
 * @param reducer - provides the state reduction logic.
 * @param initialState - seeds the reduction sequence.
 * @typeParam S - describes possible values for states.
 */
export function encapsulateReducer<S>(
  reducer: StateReducer<S>,
  initialState: S,
): StateCapsule<S> {
  const applier: ActionApplier<S> = (action: Action) => {
    const nextState = reducer(initialState, action);
    return encapsulateReducer(reducer, nextState);
  };
  return [initialState, applier];
}
