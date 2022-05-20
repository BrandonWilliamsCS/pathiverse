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
import { ResourceReader } from "system/resource/ResourceReader";
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
  registrar.registerInstance("storyListSource", storyListSource);
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
    return getReaderForContext<ContentWithResponseScene>(
      currentStory.relativeSceneRoot,
    );
  });
  registrar.registerFactory("actionTransformer", (registry) =>
    buildResolveSceneBeforeAdvanceActionTransformer(
      registry.resolveDependency("sceneReader"),
    ),
  );
}

async function generateInitialSession<Sc extends Scene, U>(storyId: string) {
  const storyList = await storyListSource<U>();
  const storySpecification = storyList.find(
    (storySpec) => storySpec.id === storyId,
  );
  if (!storySpecification) {
    throw new Error(`Cannot find story with id ${storyId}`);
  }
  const sceneReader = getReaderForContext<Sc>(
    storySpecification.relativeSceneRoot,
  );
  const initialScene = await sceneReader.getResource(
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

function getReaderForContext<T>(
  contextIndicator?: ResourceIndicator,
): ResourceReader<T> {
  if (contextIndicator?.requiresContext) {
    throw new Error("Cannot use context that requires other context");
  }
  return {
    getResource: async (resourceIndicator) => {
      let mergedIndicator = resourceIndicator;
      if (resourceIndicator.requiresContext) {
        if (!contextIndicator) {
          throw new Error(
            "Missing context for resourceIndicator that requires it",
          );
        }
        mergedIndicator = mergeResourceIndicators(
          contextIndicator,
          resourceIndicator,
        );
      }
      return await getJsonResource<T>(mergedIndicator.value);
    },
  };
}

function mergeResourceIndicators(
  contextIndicator: ResourceIndicator,
  resourceIndicator: ResourceIndicator,
): ResourceIndicator {
  if (!resourceIndicator.requiresContext) {
    return resourceIndicator;
  }
  return {
    ...contextIndicator,
    value: joinPaths([contextIndicator.value, resourceIndicator.value]),
  };
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

const storyListSource = <U,>() =>
  getReaderForContext<StorySpecification<U>[]>().getResource({
    type: "httpUrl",
    requiresContext: false,
    value: "/sample/storyList.json",
  });
