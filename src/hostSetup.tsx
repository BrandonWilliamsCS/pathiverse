import { StoryState } from "kernel/story/StoryState";
import { HostServicesBuilder } from "platform/react/HostServicesBuilder";
import { plainTextContentRenderer } from "plugin/content/plainText/plainTextContentRenderer";
import { actionInteractionOptionRenderer } from "plugin/interactionOption/action/actionInteractionOptionRenderer";
import { ContentWithResponseScene } from "plugin/scene/contentWithResponse/ContentWithResponseScene";
import { buildResolveSceneBeforeAdvanceActionMiddleware } from "system/resolveAndAdvanceScene/buildResolveSceneBeforeAdvanceActionMiddleware";
import { ResourceReader } from "system/resource/ResourceReader";
import { getJsonResource } from "util/getJsonResource";

export function hostSetup(
  hostServicesBuilder: HostServicesBuilder<
    StoryState<ContentWithResponseScene, void>
  >,
): void {
  const sceneReader: ResourceReader<ContentWithResponseScene> = {
    getResource: async (sceneIndicator) => {
      const fullPath = `/sample/scenes/${sceneIndicator.value}`;
      return await getJsonResource<ContentWithResponseScene>(fullPath);
    },
  };
  const resolveSceneBeforeAdvanceActionMiddleware =
    buildResolveSceneBeforeAdvanceActionMiddleware(sceneReader);
  hostServicesBuilder.registerActionMiddleware(
    resolveSceneBeforeAdvanceActionMiddleware,
  );
  hostServicesBuilder.registerInterfaceElementRenderer(
    plainTextContentRenderer,
  );
  hostServicesBuilder.registerInterfaceElementRenderer(
    actionInteractionOptionRenderer,
  );
}
