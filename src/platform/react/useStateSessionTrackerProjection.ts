import { useSubscribableValue } from "lib/react-data-tools/useSubscribableValue";

import { Action } from "pathiverse/kernel/Action";
import { StateSessionTracker } from "pathiverse/system/StateSessionTracker";

export function useStateSessionTrackerProjection<S>(
  tracker: StateSessionTracker<S>,
): [S, (action: Action) => void] {
  const state = useSubscribableValue(tracker.states, tracker.currentState);
  const handleAction = (action: Action) => {
    // Specify the pre-action state and only apply if unchanged
    tracker.applyAction(action, state);
  };
  return [state, handleAction];
}
