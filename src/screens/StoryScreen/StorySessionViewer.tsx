import React from "react";

import { Scene } from "kernel/Scene";
import { StoryState } from "kernel/story/StoryState";
import { SceneViewer } from "platform/react/SceneViewer";
import { useStorySessionProjection } from "platform/react/useStorySessionProjection";
import { StorySession } from "system/StorySession";

export interface StorySessionViewerProps<Sc extends Scene, U> {
  storySession: StorySession<StoryState<Sc, U>>;
}

export function StorySessionViewer<Sc extends Scene, U>({
  storySession,
}: StorySessionViewerProps<Sc, U>) {
  const [state, actionHandler] = useStorySessionProjection(storySession);
  return <SceneViewer state={state} actionHandler={actionHandler} />;
}
