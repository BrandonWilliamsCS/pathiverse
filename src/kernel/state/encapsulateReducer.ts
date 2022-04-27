import { ActionApplier } from "./ActionApplier";
import { StateCapsule } from "./StateCapsule";
import { StateReducer } from "./StateReducer";

/**
 * Initiates a sequence of state reductions based on a deferred sequence of actions.
 * @param reducer - provides the state reduction logic.
 * @param initialState - seeds the reduction sequence.
 * @typeParam S - describes possible values for states.
 * @typeParam A - describes possible actions.
 */
export function encapsulateReducer<S, A>(
  reducer: StateReducer<S, A>,
  initialState: S,
): StateCapsule<S, A> {
  const applier: ActionApplier<S, A> = async (action: A) => {
    const nextState = await reducer(initialState, action);
    return encapsulateReducer(reducer, nextState);
  };
  return [initialState, applier];
}
