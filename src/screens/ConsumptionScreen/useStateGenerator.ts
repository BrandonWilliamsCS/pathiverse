import React from "react";

import { StateGenerator } from "lib/kernel/StateGenerator";
import { SceneState } from "lib/State";
import { SceneStateGenerator } from "lib/system/state/SceneStateGenerator";
import { CompoundStateGenerator } from "lib/system/state/CompoundStateGenerator";
import { Story, sceneSourceFromStory } from "lib/system/world/Story";

export function useStateGenerator(story: Story): StateGenerator<SceneState> {
  const [stateGenerator] = React.useState(() => createStateGenerator(story));
  return stateGenerator;
}

function createStateGenerator(story: Story): StateGenerator<SceneState> {
  const sceneSource = sceneSourceFromStory(story);
  const sceneStateGenerator = new SceneStateGenerator(sceneSource);
  const stateGenerator = new CompoundStateGenerator<SceneState>({
    currentScene: sceneStateGenerator,
  });
  return stateGenerator;
}
