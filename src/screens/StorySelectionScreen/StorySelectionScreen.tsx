import { useDependencies } from "lib/unobtrusive-di-container/react";
import React from "react";

import { DependencyMap } from "host/DependencyMap";
import { Scene } from "pathiverse/kernel/Scene";
import { StorySpecification } from "pathiverse/system/StorySpecification";
import { StoryListViewer } from "./StoryListViewer";

export function StorySelectionScreen<Sc extends Scene, U>() {
  const rootPathiverseModel = useDependencies<DependencyMap<Sc, U>>()(
    "rootPathiverseModel",
  );
  const [storyList, setStoryList] = React.useState<StorySpecification<U>[]>();
  React.useEffect(() => {
    rootPathiverseModel.storyList.promiseNewestValue().then(setStoryList);
  }, [rootPathiverseModel]);
  return storyList ? (
    <StoryListViewer storyList={storyList} />
  ) : (
    <>Loading Story List...</>
  );
}
