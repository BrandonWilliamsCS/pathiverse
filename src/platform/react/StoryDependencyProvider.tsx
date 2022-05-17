import { DependencyRegistar } from "lib/unobtrusive-di-container";
import { DependencyProvider } from "lib/unobtrusive-di-container/react";
import React from "react";

import { StoryDependencyMap } from "platform/react/DependencyMap";
import { StorySpecification } from "system/StorySpecification";

export interface StoryViewerProps<U, SDM extends StoryDependencyMap<U>> {
  storySpec: StorySpecification<U>;
  registerStoryDependencies: (registrar: DependencyRegistar<SDM>) => void;
}

export function StoryDependencyProvider<U, SDM extends StoryDependencyMap<U>>({
  children,
  registerStoryDependencies,
  storySpec,
}: React.PropsWithChildren<StoryViewerProps<U, SDM>>) {
  return (
    <DependencyProvider<SDM>
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
