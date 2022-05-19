import { useDependencies } from "lib/unobtrusive-di-container/react";
import { identity } from "lodash";
import React from "react";

import { StoryDependencyMap } from "host/DependencyMap";
import { Scene } from "kernel/Scene";
import { encapsulateStoryReducer } from "kernel/story/encapsulateStoryReducer";
import { StoryState } from "kernel/story/StoryState";
import { StateSessionTracker } from "system/StateSessionTracker";
import { StorySpecification } from "system/StorySpecification";
import { StateSessionTrackerViewer } from "./StateSessionTrackerViewer";

export interface StoryViewerProps<U> {
  storySpec: StorySpecification<U>;
}

export function StoryViewer<Sc extends Scene, U>({
  storySpec,
}: StoryViewerProps<U>) {
  const getDependencies = useDependencies<StoryDependencyMap<Sc, U>>();
  const [stateSessionTracker, setStateSessionTracker] =
    React.useState<StateSessionTracker<StoryState<Sc, U>>>();
  React.useEffect(() => {
    const sceneReader = getDependencies("sceneReader");
    sceneReader
      .getResource(storySpec.initialSceneIndicator)
      .then((initialScene) => {
        setStateSessionTracker(
          new StateSessionTracker<StoryState<Sc, U>>(
            encapsulateStoryReducer<Sc, U>(
              initialScene,
              identity,
              storySpec.initialUserState,
            ),
          ),
        );
      });
  }, [getDependencies, storySpec]);
  return (
    <div className="story">
      <h2 className="story-name">{storySpec.name}</h2>
      <div className="story-content">
        {stateSessionTracker && (
          <StateSessionTrackerViewer
            stateSessionTracker={stateSessionTracker}
          />
        )}
      </div>
    </div>
  );
}
