import { useDependencies } from "lib/unobtrusive-di-container/react";
import React from "react";

import { Scene } from "kernel/Scene";
import { StoryDependencyProvider } from "platform/react/StoryDependencyProvider";
import { ResourceIndicator } from "system/resource/ResourceIndicator";
import { StorySpecification } from "system/StorySpecification";
import { DependencyMap, StoryDependencyMap } from "../../DependencyMap";
import { StoryViewer } from "./StoryViewer";

export interface StoryScreenProps {
  storyIndicator: ResourceIndicator;
}

export function StoryScreen<Sc extends Scene, U>({
  storyIndicator,
}: StoryScreenProps) {
  const getDependencies = useDependencies<DependencyMap<Sc, U>>();
  const storyReader = getDependencies("storyReader");
  const registerStoryDependencies = getDependencies(
    "registerStoryDependencies",
  );
  const [storySpec, setStorySpec] = React.useState<StorySpecification<U>>();
  React.useEffect(() => {
    storyReader.getResource(storyIndicator).then(setStorySpec);
  }, [storyReader, storyIndicator]);
  return storySpec ? (
    <StoryDependencyProvider<Sc, U, StoryDependencyMap<Sc, U>>
      storySpec={storySpec}
      registerStoryDependencies={registerStoryDependencies}
    >
      <StoryViewer storySpec={storySpec} />
    </StoryDependencyProvider>
  ) : (
    <></>
  );
}
