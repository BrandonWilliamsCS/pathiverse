import { DependencyRegistrar } from "lib/unobtrusive-di-container";

import { Scene } from "pathiverse/kernel/Scene";
import { StorySpecification } from "pathiverse/system/StorySpecification";
import { DependencyMap as PlatformDependencyMap } from "platform/react/DependencyMap";
import { RootPathiverseModel } from "platform/react/RootPathiverseModel";
import { SessionPathiverseModel } from "platform/react/SessionPathiverseModel";
import { StoryApiModel } from "platform/react/StoryApiModel";
import { DependencyMap as IndicatedContentDependencyMap } from "plugin/content/indicated/DependencyMap";
import { DependencyMap as SceneRendererDependencyMap } from "plugin/scene/contentWithResponse/DependencyMap";

export interface DependencyMap<Sc extends Scene, U>
  extends PlatformDependencyMap<Sc, U> {
  storyApiModel: StoryApiModel<Sc, U>;
  rootPathiverseModel: RootPathiverseModel<Sc, U>;
  registerStoryDependencies: (
    registrar: DependencyRegistrar<StoryDependencyMap<Sc, U>>,
  ) => void;
}

export interface StoryDependencyMap<Sc extends Scene, U>
  extends DependencyMap<Sc, U>,
    SceneRendererDependencyMap,
    IndicatedContentDependencyMap {
  currentStory: StorySpecification<U>;
  sessionPathiverseModel: SessionPathiverseModel<Sc, U>;
}
