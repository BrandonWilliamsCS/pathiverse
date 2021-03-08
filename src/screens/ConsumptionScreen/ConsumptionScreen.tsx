import React from "react";

import { Story } from "lib/kernel/story/Story";
import { buildContentResolver } from "lib/system/content/buildContentResolver";
import { ContentScene } from "lib/system/content/ContentScene";
import { StorageFactory } from "lib/system/storage/StorageFactory";
import { useFunctionInitRef } from "util/useFunctionInitRef";
import { StoryViewer } from "./StoryViewer";

export const ConsumptionScreen: React.FC = () => {
  const { current: contentResolver } = useFunctionInitRef(() =>
    buildContentResolver(storageFactory),
  );
  return <StoryViewer story={story} contentResolver={contentResolver} />;
};

const story: Story<ContentScene> = {
  initialScene: {
    story: "test story 1",
    name: "test scene 1",
    contentIndicator: { type: "text/plain", name: "scene_1_content" },
  },
};

const storageFactory: StorageFactory<string> = (path) => ({
  readValue: () => Promise.resolve(`Content for ${path}`),
  writeValue: () => {
    throw new Error("Cannot write story content.");
  },
});
