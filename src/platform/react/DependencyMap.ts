import { Scene } from "kernel/Scene";
import { StoryState } from "kernel/story/StoryState";
import { InterfaceElementRenderer } from "./InterfaceElementRenderer";

export interface DependencyMap<Sc extends Scene, U> {
  interfaceElementRenderer: InterfaceElementRenderer<StoryState<Sc, U>>;
}
