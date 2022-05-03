import React from "react";

import { Action } from "kernel/Action";
import { StoryState } from "kernel/story/StoryState";
import { ContentRenderer } from "platform/react/ContentRenderer";
import { InteractionOptionRenderer } from "platform/react/InteractionOptionRenderer";
import { ContentWithResponseScene } from "plugin/scene/contentWithResponse/ContentWithResponseScene";
import { ContentWithResponseStage } from "plugin/scene/contentWithResponse/ContentWithResponseStage";
import { StorySession } from "system/StorySession";
import { useSubscribableValue } from "util/useSubscribableValue";

export interface StoryViewerProps<S extends ContentWithResponseScene, U> {
  storySession: StorySession<StoryState<S, U>>;
  contentRenderer: ContentRenderer;
  interactionOptionRenderer: InteractionOptionRenderer;
}

export function StoryViewer<S extends ContentWithResponseScene, U>({
  contentRenderer,
  interactionOptionRenderer,
  storySession,
}: StoryViewerProps<S, U>) {
  const [{ scene }, actionHandler] = useStorySessionProjection(storySession);
  return (
    <ContentWithResponseStage
      scene={scene}
      actionHandler={actionHandler}
      contentRenderer={contentRenderer}
      interactionOptionRenderer={interactionOptionRenderer}
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