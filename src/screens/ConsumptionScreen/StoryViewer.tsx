import React from "react";

import { Action } from "kernel/Action";
import { Scene } from "kernel/Scene";
import { StoryState } from "kernel/story/StoryState";
import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import { StorySession } from "system/StorySession";
import { useSubscribableValue } from "util/useSubscribableValue";

export interface StoryViewerProps<S extends Scene, U> {
  storySession: StorySession<StoryState<S, U>>;
  interfaceElementRenderer: InterfaceElementRenderer;
}

export function StoryViewer<S extends Scene, U>({
  interfaceElementRenderer,
  storySession,
}: StoryViewerProps<S, U>) {
  const [{ scene }, actionHandler] = useStorySessionProjection(storySession);
  return (
    <>
      {interfaceElementRenderer.render(
        scene,
        actionHandler,
        interfaceElementRenderer,
      )}
    </>
  );
}

function useStorySessionProjection<S>(
  storySession: StorySession<S>,
): [S, (action: Action) => Promise<void>] {
  const state = useSubscribableValue(
    storySession.states,
    storySession.currentState,
  );
  const handleAction = storySession.applyAction.bind(storySession);
  return [state, handleAction];
}
