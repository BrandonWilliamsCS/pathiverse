import {
  DependencyProvider,
  useDependencies,
} from "lib/unobtrusive-di-container/react";
import React from "react";

import { DependencyMap, StoryDependencyMap } from "host/DependencyMap";
import { Session } from "host/Session";
import { Scene } from "kernel/Scene";
import { ResourceIndicator } from "system/resource/ResourceIndicator";
import { SessionViewer } from "./SessionViewer";

export interface StoryScreenProps {
  storyIndicator: ResourceIndicator;
}

export function StoryScreen<Sc extends Scene, U>({
  storyIndicator,
}: StoryScreenProps) {
  const getDependencies = useDependencies<DependencyMap<Sc, U>>();
  const sessionGenerator = getDependencies("initialSessionGenerator");
  const registerStoryDependencies = getDependencies(
    "registerStoryDependencies",
  );
  const [session, setSession] = React.useState<Session<Sc, U>>();
  React.useEffect(() => {
    sessionGenerator(storyIndicator).then(setSession);
  }, [sessionGenerator, storyIndicator]);
  return session ? (
    <DependencyProvider<StoryDependencyMap<Sc, U>>
      key={session.storySpecification.id}
      registerDependencies={(registrar) => {
        registrar.registerInstance("currentStory", session.storySpecification);
        registerStoryDependencies(registrar);
      }}
    >
      <SessionViewer session={session} />
    </DependencyProvider>
  ) : (
    <>Loading Story...</>
  );
}
