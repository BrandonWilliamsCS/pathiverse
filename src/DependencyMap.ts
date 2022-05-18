import { DependencyRegistar } from "lib/unobtrusive-di-container";

import { Scene } from "kernel/Scene";
import {
  DependencyMap as PlatformDependencyMap,
  StoryDependencyMap as PlaformStoryDependencyMap,
} from "platform/react/DependencyMap";
import { DependencyMap as SceneRendererDependencyMap } from "plugin/scene/contentWithResponse/DependencyMap";
import { ResourceReader } from "system/resource/ResourceReader";

export interface DependencyMap<Sc extends Scene, U>
  extends PlatformDependencyMap<U> {
  registerStoryDependencies: (
    registrar: DependencyRegistar<StoryDependencyMap<Sc, U>>,
  ) => void;
}

export interface StoryDependencyMap<Sc extends Scene, U>
  extends PlaformStoryDependencyMap<Sc, U>,
    SceneRendererDependencyMap {
  sceneReader: ResourceReader<Sc>;
}
