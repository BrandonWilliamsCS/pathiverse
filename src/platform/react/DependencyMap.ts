import { Scene } from "kernel/Scene";
import { StoryState } from "kernel/story/StoryState";
import { ResourceReader } from "system/resource/ResourceReader";
import { StorySpecification } from "system/StorySpecification";
import { InterfaceElementRenderer } from "./InterfaceElementRenderer";

export interface DependencyMap<U> {
  storyReader: ResourceReader<StorySpecification<U>>;
}

export interface StoryDependencyMap<Sc extends Scene, U>
  extends DependencyMap<U> {
  currentStory: StorySpecification<U>;
  interfaceElementRenderer: InterfaceElementRenderer<StoryState<Sc, U>>;
}
