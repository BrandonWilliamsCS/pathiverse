import { DependencyRegistrar } from "lib/unobtrusive-di-container";
import { identity } from "lodash";

import { Scene } from "kernel/Scene";
import { encapsulateStoryReducer } from "kernel/story/encapsulateStoryReducer";
import { StoryState } from "kernel/story/StoryState";
import { buildCompositeInterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import { plainTextContentRenderer } from "plugin/content/plainText/plainTextContentRenderer";
import { actionInteractionOptionRenderer } from "plugin/interactionOption/action/actionInteractionOptionRenderer";
import { ContentWithResponseScene } from "plugin/scene/contentWithResponse/ContentWithResponseScene";
import { contentWithResponseSceneRenderer } from "plugin/scene/contentWithResponse/contentWithResponseSceneRenderer";
import { buildResolveSceneBeforeAdvanceActionTransformer } from "system/resolveAndAdvanceScene/buildResolveSceneBeforeAdvanceActionTransformer";
import { ResourceIndicator } from "system/resource/ResourceIndicator";
import { StateSessionTracker } from "system/StateSessionTracker";
import { StorySpecification } from "system/StorySpecification";
import { getJsonResource } from "util/getJsonResource";
import { DependencyMap, StoryDependencyMap } from "./DependencyMap";

export type HostedSceneType = ContentWithResponseScene;
export type HostedUserStateType = void;

export function registerDependencies(
  registrar: DependencyRegistrar<
    DependencyMap<HostedSceneType, HostedUserStateType>
  >,
) {
  registrar.registerInstance(
    "interfaceElementRenderer",
    buildCompositeInterfaceElementRenderer([
      contentWithResponseSceneRenderer,
      plainTextContentRenderer,
      actionInteractionOptionRenderer,
    ]),
  );
  registrar.registerInstance("storyListSource", getStoryList);
  registrar.registerInstance("initialSessionGenerator", generateInitialSession);
  registrar.registerInstance(
    "registerStoryDependencies",
    registerStoryDependencies,
  );
}

export function registerStoryDependencies(
  registrar: DependencyRegistrar<
    StoryDependencyMap<HostedSceneType, HostedUserStateType>
  >,
) {
  registrar.registerFactory("sceneReader", (registry) => {
    const currentStory = registry.resolveDependency("currentStory");
    return (indicator) => getScene(currentStory, indicator);
  });
  registrar.registerFactory("actionTransformer", (registry) =>
    buildResolveSceneBeforeAdvanceActionTransformer(
      registry.resolveDependency("sceneReader"),
    ),
  );
}

async function generateInitialSession<Sc extends Scene, U>(storyId: string) {
  const storyList = await getStoryList<U>();
  const storySpecification = storyList.find(
    (storySpec) => storySpec.id === storyId,
  );
  if (!storySpecification) {
    throw new Error(`Cannot find story with id ${storyId}`);
  }
  const initialScene = await getScene<Sc>(
    storySpecification,
    storySpecification.initialSceneIndicator,
  );
  return {
    storySpecification,
    stateSessionTracker: new StateSessionTracker<StoryState<Sc, U>>(
      encapsulateStoryReducer<Sc, U>(
        initialScene,
        identity,
        storySpecification.initialUserState,
      ),
    ),
  };
}

function getStoryList<U>() {
  return getJsonResource<StorySpecification<U>[]>("/api/story");
}

function getScene<Sc>(
  storySpec: StorySpecification<any>,
  sceneIndicator: ResourceIndicator,
) {
  return getJsonResource<Sc>(
    joinPaths(["/api/story", storySpec.id, "/scene", sceneIndicator.value]),
  );
}

function joinPaths(parts: string[]) {
  const separator = "/";
  parts = parts.map((part, i) => {
    // Remove leading slashes, except for the first part
    if (i > 0 && part.startsWith(separator)) {
      part = part.substring(separator.length);
    }
    // Remove trailing slashes, except for the first part
    if (i !== parts.length - 1 && part.endsWith(separator)) {
      part = part.substring(0, part.length - separator.length);
    }
    return part;
  });
  return parts.join(separator);
}
