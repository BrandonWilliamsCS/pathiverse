import {
  DependencyProvider,
  useDependencies,
} from "lib/unobtrusive-di-container/react";
import React from "react";

import { Scene } from "kernel/Scene";
import {
  DependencyMap,
  StoryDependencyMap,
} from "platform/react/DependencyMap";
import { StorySpecification } from "system/StorySpecification";

export interface StoryViewerProps<U> {
  storySpec: StorySpecification<U>;
}

export function StoryDependencyProvider<Sc extends Scene, U>({
  children,
  storySpec,
}: React.PropsWithChildren<StoryViewerProps<U>>) {
  const registerStoryDependencies = useDependencies<DependencyMap<Sc, U>>()(
    "registerStoryDependencies",
  );
  return (
    <DependencyProvider<StoryDependencyMap<Sc, U>>
      key={storySpec.id}
      registerDependencies={(registrar) => {
        registrar.registerInstance("currentStory", storySpec);
        registerStoryDependencies(registrar);
      }}
    >
      {children}
    </DependencyProvider>
  );
}
