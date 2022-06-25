import { DependencyRegistrar } from "lib/unobtrusive-di-container";
import { buildResolveSceneBeforeAdvanceActionTransformer } from "pathiverse/system/resolveAndAdvanceScene/buildResolveSceneBeforeAdvanceActionTransformer";
import { buildCompositeInterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import { RootPathiverseModel } from "platform/react/RootPathiverseModel";
import { SessionPathiverseModel } from "platform/react/SessionPathiverseModel";
import { StoryApiModel } from "platform/react/StoryApiModel";
import { indicatedContentRenderer } from "plugin/content/indicated/indicatedContentRenderer";
import { markdownContentRenderer } from "plugin/content/markdown/markdownContentRenderer";
import { plainTextContentRenderer } from "plugin/content/plainText/plainTextContentRenderer";
import { actionInteractionOptionRenderer } from "plugin/interactionOption/action/actionInteractionOptionRenderer";
import { ContentWithResponseScene } from "plugin/scene/contentWithResponse/ContentWithResponseScene";
import { contentWithResponseSceneRenderer } from "plugin/scene/contentWithResponse/contentWithResponseSceneRenderer";
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
      indicatedContentRenderer,
      markdownContentRenderer,
      plainTextContentRenderer,
      actionInteractionOptionRenderer,
    ]),
  );
  registrar.registerInstance(
    "storyApiModel",
    new StoryApiModel("http://localhost:3001"),
  );
  registrar.registerFactory("rootPathiverseModel", (registry) => {
    const storyApiModel = registry.resolveDependency("storyApiModel");
    return new RootPathiverseModel(storyApiModel);
  });
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
  registrar.registerFactory("sessionPathiverseModel", (registry) => {
    const currentStory = registry.resolveDependency("currentStory");
    const storyApiModel = registry.resolveDependency("storyApiModel");
    return new SessionPathiverseModel(storyApiModel, currentStory);
  });
  registrar.registerFactory("indicatedContentReader", (registry) => {
    const sessionPathiverseModel = registry.resolveDependency(
      "sessionPathiverseModel",
    );
    return (indicator) =>
      sessionPathiverseModel.getContent(indicator).promiseNewestValue();
  });
  registrar.registerFactory("actionTransformer", (registry) =>
    buildResolveSceneBeforeAdvanceActionTransformer(
      registry.resolveDependency("sessionPathiverseModel"),
    ),
  );
}
