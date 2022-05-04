import React from "react";

import {
  AdvanceSceneAction,
  advanceSceneActionType,
} from "kernel/story/AdvanceSceneAction";
import { StoryState } from "kernel/story/StoryState";
import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
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
import { ActionMiddleware } from "system/ActionMiddleware";
import { isResolveAndAdvanceSceneAction } from "system/ResolveAndAdvanceSceneAction";
import { getJsonResource } from "util/getJsonResource";

const resolveSceneBeforeAdvanceActionMiddleware: ActionMiddleware<
  StoryState<ContentWithResponseScene, void>
> = async (action, next) => {
  if (!isResolveAndAdvanceSceneAction(action)) {
    return await next(action);
  }
  const fullPath = `/sample/scenes/${action.sceneIndicator.value}`;
  const scene = await getJsonResource<ContentWithResponseScene>(fullPath);
  return await next({
    type: advanceSceneActionType,
    scene,
  } as AdvanceSceneAction<ContentWithResponseScene>);
};
const interfaceElementRenderer: InterfaceElementRenderer = {
  canRender: (interfaceElement) =>
    isActionInteractionOption(interfaceElement) ||
    isPlainTextContent(interfaceElement),
  render: (interfaceElement, actionHandler) =>
    isActionInteractionOption(interfaceElement) ? (
      <ActionInteractionOptionDisplay
        interactionOption={interfaceElement as ActionInteractionOption}
        actionHandler={actionHandler}
      />
    ) : (
      <PlainTextContentDisplay content={interfaceElement as PlainTextContent} />
    ),
};

export const services = {
  actionMiddleware: resolveSceneBeforeAdvanceActionMiddleware,
  interfaceElementRenderer,
};
