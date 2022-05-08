import { identity } from "lodash";
import React from "react";

import { Scene } from "kernel/Scene";
import { encapsulateStoryReducer } from "kernel/story/encapsulateStoryReducer";
import { StoryState } from "kernel/story/StoryState";
import { HostServices } from "platform/react/HostServices";
import { StorySession } from "system/StorySession";
import { useFunctionInitRef } from "util/useFunctionInitRef";
import { StoryViewer } from "./StoryViewer";

export interface ConsumptionScreenProps<S> {
  hostServices: HostServices<S>;
}

export function ConsumptionScreen<Sc extends Scene>({
  hostServices,
}: ConsumptionScreenProps<StoryState<Sc, void>>) {
  const { current: storySession } = useFunctionInitRef(
    () =>
      new StorySession<StoryState<Sc, void>>(
        encapsulateStoryReducer<Sc, void>(initialScene, identity, undefined),
        hostServices.actionMiddleware,
      ),
  );
  return (
    <StoryViewer
      storySession={storySession}
      interfaceElementRenderer={hostServices.interfaceElementRenderer}
    />
  );
}

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
} as any;
