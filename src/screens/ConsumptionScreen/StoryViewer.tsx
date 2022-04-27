import React from "react";

import { Story } from "kernel/story/Story";
import { useVanillaPathiverseStoryKernel } from "platform/react/useVanillaPathiverseStoryKernel";
import { ContentScene } from "system/content/ContentScene";
import { ContentResovler } from "system/content/ContentResolver";
import { usePromisedValue } from "util/usePromisedValue";

export const StoryViewer: React.FC<StoryViewerProps> = ({
  contentResolver,
  story,
}) => {
  const [
    { scene: currentScene },
    actionHandler,
  ] = useVanillaPathiverseStoryKernel(story);
  const contentPromise = React.useMemo(
    () => contentResolver(currentScene.contentIndicator),
    [currentScene, contentResolver],
  );
  const promisedContent = usePromisedValue(contentPromise);
  return promisedContent.resolved ? (
    <pre>{JSON.stringify(promisedContent.value, null, 2)}</pre>
  ) : (
    <span>Loading content...</span>
  );
};

export interface StoryViewerProps {
  contentResolver: ContentResovler;
  story: Story<ContentScene>;
}
