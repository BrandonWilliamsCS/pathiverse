import { useSubscribableValue } from "lib/react-data-tools/useSubscribableValue";

import { Action } from "kernel/Action";
import { StorySession } from "system/StorySession";

export function useStorySessionProjection<S>(
  storySession: StorySession<S>,
): [S, (action: Action) => Promise<void>] {
  const state = useSubscribableValue(
    storySession.states,
    storySession.currentState,
  );
  const handleAction = storySession.applyAction.bind(storySession);
  return [state, handleAction];
}
