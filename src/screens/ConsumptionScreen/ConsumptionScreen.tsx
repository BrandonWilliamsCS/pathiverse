import React from "react";

import { StoryViewer } from "./StoryViewer";

import testStory from "../../test-files/story.json";

export const ConsumptionScreen: React.FC = () => {
  return <StoryViewer story={testStory} />;
};
