import React from "react";

import { useVanillaPathiverseStoryKernel } from "platform/react/useVanillaPathiverseStoryKernel";
import { ContentScene } from "system/content/ContentScene";
import { ContentResovler } from "system/content/ContentResolver";
import { usePromisedValue } from "util/usePromisedValue";

export interface StoryViewerProps {
  contentResolver: ContentResovler;
  initialScene: ContentScene;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  contentResolver,
  initialScene,
}) => {
  const [{ scene: currentScene }, actionHandler] =
    useVanillaPathiverseStoryKernel(initialScene);
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
