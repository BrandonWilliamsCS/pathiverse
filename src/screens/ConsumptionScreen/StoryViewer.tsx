import React from "react";
import { useStateMachine } from "lib/platform/react/useStateMachine";
import { isMarkdownPathContent } from "lib/plugin/markdown-path/MarkdownPathContent";
import { MarkdownPathContentComponent } from "lib/plugin/markdown-path/MarkdownPathContentComponent";
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
      nextSceneName: story.startSceneName,
    };
    actionHandler(action);
  };
  if (!data) {
    return (
      <button type="button" onClick={loadScene}>
        Load Scene
      </button>
    );
  }
  const [, content] = data;
  if (!isMarkdownPathContent(content)) {
    return <>Unable to render content with type {content.type}</>;
  }
  return (
    <MarkdownPathContentComponent
      content={content}
      actionHandler={actionHandler}
    />
  );
};

export interface StoryViewerProps {
  story: Story;
}
