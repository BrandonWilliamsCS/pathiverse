import React from "react";

import {
  AdvanceSceneAction,
  advanceSceneActionType,
} from "kernel/story/AdvanceSceneAction";
import { StoryState } from "kernel/story/StoryState";
import { HostServicesBuilder } from "platform/react/HostServicesBuilder";
import {
  isPlainTextContent,
  PlainTextContent,
} from "plugin/content/plainText/PlainTextContent";
import { PlainTextContentDisplay } from "plugin/content/plainText/PlainTextContentDisplay";
import {
  ActionInteractionOption,
  isActionInteractionOption,
} from "plugin/interactionOption/action/ActionInteractionOption";
import { ActionInteractionOptionDisplay } from "plugin/interactionOption/action/ActionInteractionOptionDisplay";
import { ContentWithResponseScene } from "plugin/scene/contentWithResponse/ContentWithResponseScene";
import { isResolveAndAdvanceSceneAction } from "system/ResolveAndAdvanceSceneAction";
import { getJsonResource } from "util/getJsonResource";

export function hostSetup(
  hostServicesBuilder: HostServicesBuilder<
    StoryState<ContentWithResponseScene, void>
  >,
): void {
  hostServicesBuilder.registerActionMiddleware(async (action, next) => {
    if (!isResolveAndAdvanceSceneAction(action)) {
      return await next(action);
    }
    const fullPath = `/sample/scenes/${action.sceneIndicator.value}`;
    const scene = await getJsonResource<ContentWithResponseScene>(fullPath);
    return await next({
      type: advanceSceneActionType,
      scene,
    } as AdvanceSceneAction<ContentWithResponseScene>);
  });
  hostServicesBuilder.registerInterfaceElementRenderer({
    canRender: isPlainTextContent,
    render: (interfaceElement) => (
      <PlainTextContentDisplay content={interfaceElement as PlainTextContent} />
    ),
  });
  hostServicesBuilder.registerInterfaceElementRenderer({
    canRender: isActionInteractionOption,
    render: (interfaceElement, actionHandler) => (
      <ActionInteractionOptionDisplay
        interactionOption={interfaceElement as ActionInteractionOption}
        actionHandler={actionHandler}
      />
    ),
  });
}
