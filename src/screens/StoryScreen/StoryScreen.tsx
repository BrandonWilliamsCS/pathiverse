import { useDependencies } from "lib/unobtrusive-di-container/react";
import React from "react";

import { Scene } from "kernel/Scene";
import { DependencyMap } from "platform/react/DependencyMap";
import { StoryDependencyProvider } from "platform/react/StoryDependencyProvider";
import { ResourceIndicator } from "system/resource/ResourceIndicator";
import { StorySpecification } from "system/StorySpecification";
import { StoryViewer } from "./StoryViewer";

export interface StoryScreenProps {
  storyIndicator: ResourceIndicator;
}

export function StoryScreen<Sc extends Scene, U>({
  storyIndicator,
}: StoryScreenProps) {
  const storyReader = useDependencies<DependencyMap<Sc, U>>()("storyReader");
  const [storySpec, setStorySpec] = React.useState<StorySpecification<U>>();
  React.useEffect(() => {
    storyReader.getResource(storyIndicator).then(setStorySpec);
  }, [storyReader, storyIndicator]);
  return storySpec ? (
    <StoryDependencyProvider<Sc, U> storySpec={storySpec}>
      <StoryViewer storySpec={storySpec} />
    </StoryDependencyProvider>
  ) : (
    <></>
  );
}
