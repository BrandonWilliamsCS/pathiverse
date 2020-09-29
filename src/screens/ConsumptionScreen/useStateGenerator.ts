import React from "react";

import { StateGenerator } from "lib/kernel/StateGenerator";
import { Scene } from "lib/Scene";
import { SceneState } from "lib/State";
import { SceneStateGenerator } from "lib/system/state/SceneStateGenerator";
import { CompoundStateGenerator } from "lib/system/state/CompoundStateGenerator";

export function useStateGenerator(): StateGenerator<SceneState> {
  const [stateGenerator] = React.useState(createStateGenerator);
  return stateGenerator;
}

function createStateGenerator(): StateGenerator<SceneState> {
  // TODO: don't hardcode sceneSource - based on story instead
  const sceneSource = () =>
    Promise.resolve<Scene>({
      world: "WORLD",
      story: "STORY",
      name: "SCENE",
      summary: undefined,
      branchSummary: undefined,
      contentIndicator: {
        type: "markdown",
        name: "content.md",
      },
      possibleActions: [],
    });
  const sceneStateGenerator = new SceneStateGenerator(sceneSource);
  const stateGenerator = new CompoundStateGenerator<SceneState>({
    currentScene: sceneStateGenerator,
  });
  return stateGenerator;
}
