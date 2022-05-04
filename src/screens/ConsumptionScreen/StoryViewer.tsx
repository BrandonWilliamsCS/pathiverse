import React from "react";

import { Action } from "kernel/Action";
import { StoryState } from "kernel/story/StoryState";
import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import { ContentWithResponseScene } from "plugin/scene/contentWithResponse/ContentWithResponseScene";
import { ContentWithResponseStage } from "plugin/scene/contentWithResponse/ContentWithResponseStage";
import { StorySession } from "system/StorySession";
import { useSubscribableValue } from "util/useSubscribableValue";

export interface StoryViewerProps<S extends ContentWithResponseScene, U> {
  storySession: StorySession<StoryState<S, U>>;
  interfaceElementRenderer: InterfaceElementRenderer;
}

export function StoryViewer<S extends ContentWithResponseScene, U>({
  interfaceElementRenderer,
  storySession,
}: StoryViewerProps<S, U>) {
  const [{ scene }, actionHandler] = useStorySessionProjection(storySession);
  return (
    <ContentWithResponseStage
      scene={scene}
      actionHandler={actionHandler}
      interfaceElementRenderer={interfaceElementRenderer}
    />
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
