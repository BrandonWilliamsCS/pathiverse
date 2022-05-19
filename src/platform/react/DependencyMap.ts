import { Scene } from "kernel/Scene";
import { StoryState } from "kernel/story/StoryState";
import { ResourceReader } from "system/resource/ResourceReader";
import { StorySpecification } from "system/StorySpecification";
import { InterfaceElementRenderer } from "./InterfaceElementRenderer";

export interface DependencyMap<Sc extends Scene, U> {
  storyReader: ResourceReader<StorySpecification<U>>;
  interfaceElementRenderer: InterfaceElementRenderer<StoryState<Sc, U>>;
}
