import React from "react";

import { Scene } from "kernel/Scene";
import { StoryState } from "kernel/story/StoryState";
import { SceneViewer } from "platform/react/SceneViewer";
import { useStateSessionTrackerProjection } from "platform/react/useStateSessionTrackerProjection";
import { StateSessionTracker } from "system/StateSessionTracker";

export interface StateSessionTrackerViewerProps<Sc extends Scene, U> {
  stateSessionTracker: StateSessionTracker<StoryState<Sc, U>>;
}

export function StateSessionTrackerViewer<Sc extends Scene, U>({
  stateSessionTracker,
}: StateSessionTrackerViewerProps<Sc, U>) {
  const [state, actionHandler] =
    useStateSessionTrackerProjection(stateSessionTracker);
  return <SceneViewer state={state} actionHandler={actionHandler} />;
}
