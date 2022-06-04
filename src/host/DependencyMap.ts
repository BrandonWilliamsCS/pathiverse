import { DependencyRegistrar } from "lib/unobtrusive-di-container";

import { Scene } from "kernel/Scene";
import { DependencyMap as IndicatedContentDependencyMap } from "plugin/content/indicated/DependencyMap";
import { DependencyMap as PlatformDependencyMap } from "platform/react/DependencyMap";
import { DependencyMap as SceneRendererDependencyMap } from "plugin/scene/contentWithResponse/DependencyMap";
import { ResourceIndicator } from "system/resource/ResourceIndicator";
import { StorySpecification } from "system/StorySpecification";
import { Session } from "./Session";

export interface DependencyMap<Sc extends Scene, U>
  extends PlatformDependencyMap<Sc, U> {
  storyListSource: () => Promise<StorySpecification<any>[]>;
  initialSessionGenerator: (storyId: string) => Promise<Session<Sc, U>>;
  registerStoryDependencies: (
    registrar: DependencyRegistrar<StoryDependencyMap<Sc, U>>,
  ) => void;
}

export interface StoryDependencyMap<Sc extends Scene, U>
  extends SceneRendererDependencyMap,
    IndicatedContentDependencyMap {
  currentStory: StorySpecification<U>;
  sceneReader: (indicator: ResourceIndicator) => Promise<Sc>;
}
