import { useDependencies } from "lib/unobtrusive-di-container/react";
import React from "react";

import { DependencyMap } from "host/DependencyMap";
import { Scene } from "pathiverse/kernel/Scene";
import { StorySpecification } from "pathiverse/system/StorySpecification";
import { StoryListViewer } from "./StoryListViewer";

export function StorySelectionScreen<Sc extends Scene, U>() {
  const storyListSource =
    useDependencies<DependencyMap<Sc, U>>()("storyListSource");
  const [storyList, setStoryList] = React.useState<StorySpecification<U>[]>();
  React.useEffect(() => {
    storyListSource().then(setStoryList);
  }, [storyListSource]);
  return storyList ? (
    <StoryListViewer storyList={storyList} />
  ) : (
    <>Loading Story List...</>
  );
}
