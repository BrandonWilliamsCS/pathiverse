import { DependencyRegistrar } from "lib/unobtrusive-di-container";
import { DependencyProvider } from "lib/unobtrusive-di-container/react";
import React from "react";

import { Scene } from "kernel/Scene";
import { StorySpecification } from "system/StorySpecification";
import { StoryDependencyMap } from "./DependencyMap";

export interface StoryViewerProps<
  Sc extends Scene,
  U,
  SDM extends StoryDependencyMap<Sc, U>,
> {
  storySpec: StorySpecification<U>;
  registerStoryDependencies: (registrar: DependencyRegistrar<SDM>) => void;
}

export function StoryDependencyProvider<
  Sc extends Scene,
  U,
  SDM extends StoryDependencyMap<Sc, U>,
>({
  children,
  registerStoryDependencies,
  storySpec,
}: React.PropsWithChildren<StoryViewerProps<Sc, U, SDM>>) {
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
