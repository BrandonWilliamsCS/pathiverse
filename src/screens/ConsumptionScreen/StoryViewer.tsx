import React from "react";
import { useStateMachine } from "lib/platform/react/useStateMachine";
import { AdvanceSceneAction } from "lib/system/state/SceneStateGenerator";
import { Story } from "lib/system/world/Story";

import { useContentResolver } from "./useContentResolver";
import { useStateGenerator } from "./useStateGenerator";

export const StoryViewer: React.FC<StoryViewerProps> = ({ story }) => {
  const stateGenerator = useStateGenerator(story);
  const contentResolver = useContentResolver();
  const [data, actionHandler] = useStateMachine(
    stateGenerator,
    contentResolver,
  );
  const loadScene = () => {
    const action: AdvanceSceneAction = {
      type: "scene.advance",
      nextSceneName: "SCENE1",
    };
    actionHandler(action);
  };
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button type="button" onClick={loadScene}>
        Load Scene
      </button>
    </>
  );
};

export interface StoryViewerProps {
  story: Story;
}
