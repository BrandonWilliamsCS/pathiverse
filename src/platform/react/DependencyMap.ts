import { DependencyRegistar } from "lib/unobtrusive-di-container";

import { Scene } from "kernel/Scene";
import { StoryState } from "kernel/story/StoryState";
import { ActionMiddleware } from "system/ActionMiddleware";
import { ResourceReader } from "system/resource/ResourceReader";
import { StorySpecification } from "system/StorySpecification";
import { InterfaceElementRenderer } from "./InterfaceElementRenderer";

export interface DependencyMap<Sc extends Scene, U> {
  storyReader: ResourceReader<StorySpecification<U>>;
  registerStoryDependencies: (
    registrar: DependencyRegistar<StoryDependencyMap<Sc, U>>,
  ) => void;
}

export interface StoryDependencyMap<Sc extends Scene, U>
  extends DependencyMap<Sc, U> {
  actionMiddleware: ActionMiddleware<StoryState<Sc, U>>;
  currentStory: StorySpecification<U>;
  interfaceElementRenderer: InterfaceElementRenderer;
  sceneReader: ResourceReader<Sc>;
}
