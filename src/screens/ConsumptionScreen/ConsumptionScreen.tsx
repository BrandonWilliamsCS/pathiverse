import { identity } from "lodash";
import React from "react";

import { encapsulateStoryReducer } from "kernel/story/encapsulateStoryReducer";
import { StoryState } from "kernel/story/StoryState";
import { ContentWithResponseScene } from "plugin/scene/contentWithResponse/ContentWithResponseScene";
import { services } from "services";
import { StorySession } from "system/StorySession";
import { useFunctionInitRef } from "util/useFunctionInitRef";
import { StoryViewer } from "./StoryViewer";

export const ConsumptionScreen: React.FC = () => {
  const { current: storySession } = useFunctionInitRef(
    () =>
      new StorySession<StoryState<ContentWithResponseScene, void>>(
        encapsulateStoryReducer(initialScene, identity, undefined),
        services.actionMiddleware,
      ),
  );
  return (
    <StoryViewer
      storySession={storySession}
      contentRenderer={services.contentRenderer}
      interactionOptionRenderer={services.interactionOptionRenderer}
    />
  );
};

const initialScene = {
  type: "pathiverse.scene.contentWithResponse",
  name: "Up To Bat",
  content: {
    type: "pathiverse.content.text/plain",
    value: "You step up to the plate, swing at the pitch, and...",
  },
  responsePrompt: "How does it go?",
  responseOptions: [
    {
      type: "pathiverse.interactionOption.action",
      label: "Great success!",
      action: {
        type: "pathiverse.action.resolveAndAdvanceScene",
        sceneIndicator: {
          type: "relativeUri",
          value: "/homeRun.json",
        },
      },
    },
    {
      type: "pathiverse.interactionOption.action",
      label: "Abysmal failure.",
      action: {
        type: "pathiverse.action.resolveAndAdvanceScene",
        sceneIndicator: {
          type: "relativeUri",
          value: "/shame.json",
        },
      },
    },
  ],
} as unknown as ContentWithResponseScene;
