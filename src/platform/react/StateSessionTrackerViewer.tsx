import React from "react";

import { Scene } from "pathiverse/kernel/Scene";
import { StoryState } from "pathiverse/kernel/story/StoryState";
import { StateSessionTracker } from "pathiverse/system/StateSessionTracker";
import { SceneViewer } from "platform/react/SceneViewer";
import { useStateSessionTrackerProjection } from "platform/react/useStateSessionTrackerProjection";

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
