import { useDependencies } from "lib/unobtrusive-di-container/react";
import React from "react";

import { Action } from "kernel/Action";
import { Scene } from "kernel/Scene";
import { StoryState } from "kernel/story/StoryState";
import { StoryDependencyMap } from "./DependencyMap";

export interface SceneViewerProps<Sc extends Scene, U> {
  actionHandler: (action: Action) => void;
  state: StoryState<Sc, U>;
}

export function SceneViewer<Sc extends Scene, U>({
  actionHandler,
  state,
}: SceneViewerProps<Sc, U>) {
  const getDependencies = useDependencies<StoryDependencyMap<Sc, U>>();
  const actionTransformer = getDependencies("actionTransformer");
  const interfaceElementRenderer = getDependencies("interfaceElementRenderer");
  return (
    <>
      {interfaceElementRenderer.render(
        state.scene,
        async (action) => {
          const transformedAction = await actionTransformer(action);
          actionHandler(transformedAction);
        },
        interfaceElementRenderer,
      )}
    </>
  );
}
