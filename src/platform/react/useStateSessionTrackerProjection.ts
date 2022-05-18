import { useSubscribableValue } from "lib/react-data-tools/useSubscribableValue";

import { Action } from "kernel/Action";
import { StateSessionTracker } from "system/StateSessionTracker";

export function useStateSessionTrackerProjection<S>(
  tracker: StateSessionTracker<S>,
): [S, (action: Action) => void] {
  const state = useSubscribableValue(tracker.states, tracker.currentState);
  const handleAction = tracker.applyAction.bind(tracker);
  return [state, handleAction];
}
