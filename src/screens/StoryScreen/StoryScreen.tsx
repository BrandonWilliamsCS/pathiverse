import {
  DependencyProvider,
  useDependencies,
} from "lib/unobtrusive-di-container/react";
import React from "react";
import { useParams } from "react-router-dom";

import { DependencyMap, StoryDependencyMap } from "host/DependencyMap";
import { Session } from "host/Session";
import { Scene } from "pathiverse/kernel/Scene";
import { SessionViewer } from "./SessionViewer";

export function StoryScreen<Sc extends Scene, U>() {
  const { storyId } = useParams();
  const getDependencies = useDependencies<DependencyMap<Sc, U>>();
  const sessionGenerator = getDependencies("initialSessionGenerator");
  const registerStoryDependencies = getDependencies(
    "registerStoryDependencies",
  );
  const [session, setSession] = React.useState<Session<Sc, U>>();
  React.useEffect(() => {
    sessionGenerator(storyId!).then(setSession);
  }, [sessionGenerator, storyId]);
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
