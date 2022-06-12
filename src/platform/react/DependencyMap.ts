import { Scene } from "pathiverse/kernel/Scene";
import { StoryState } from "pathiverse/kernel/story/StoryState";
import { InterfaceElementRenderer } from "./InterfaceElementRenderer";

export interface DependencyMap<Sc extends Scene, U> {
  interfaceElementRenderer: InterfaceElementRenderer<StoryState<Sc, U>>;
}
