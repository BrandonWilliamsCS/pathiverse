import { useDependencies } from "lib/unobtrusive-di-container/react";
import { identity } from "lodash";
import React from "react";

import { Scene } from "kernel/Scene";
import { encapsulateStoryReducer } from "kernel/story/encapsulateStoryReducer";
import { StoryState } from "kernel/story/StoryState";
import { StoryDependencyMap } from "platform/react/DependencyMap";
import { StorySession } from "system/StorySession";
import { StorySpecification } from "system/StorySpecification";
import { StorySessionViewer } from "./StorySessionViewer";

export interface StoryViewerProps<U> {
  storySpec: StorySpecification<U>;
}

export function StoryViewer<Sc extends Scene, U>({
  storySpec,
}: StoryViewerProps<U>) {
  const getDependencies = useDependencies<StoryDependencyMap<Sc, U>>();
  const [storySession, setStorySession] =
    React.useState<StorySession<StoryState<Sc, U>>>();
  React.useEffect(() => {
    const sceneReader = getDependencies("sceneReader");
    sceneReader
      .getResource(storySpec.initialSceneIndicator)
      .then((initialScene) => {
        setStorySession(
          new StorySession<StoryState<Sc, U>>(
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
        {storySession && <StorySessionViewer storySession={storySession} />}
      </div>
    </div>
  );
}
