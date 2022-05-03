import React from "react";

import {
  AdvanceSceneAction,
  advanceSceneActionType,
} from "kernel/story/AdvanceSceneAction";
import { StoryState } from "kernel/story/StoryState";
import { ContentRenderer } from "platform/react/ContentRenderer";
import { InteractionOptionRenderer } from "platform/react/InteractionOptionRenderer";
import {
  isPlainTextContent,
  PlainTextContent,
} from "plugin/content/plainText/PlainTextContent";
import { PlainTextContentDisplay } from "plugin/content/plainText/PlainTextContentDisplay";
import {
  ActionInteractionOption,
  isActionInteractionOption,
} from "plugin/interactionOption/action/ActionInteractionOption";
import { ContentWithResponseScene } from "plugin/scene/contentWithResponse/ContentWithResponseScene";
import { ActionMiddleware } from "system/ActionMiddleware";
import {
  isResolveAndAdvanceSceneAction,
  ResolveAndAdvanceSceneAction,
} from "system/ResolveAndAdvanceSceneAction";
import { ActionInteractionOptionDisplay } from "plugin/interactionOption/action/ActionInteractionOptionDisplay";
import { getJsonResource } from "util/getJsonResource";

export type AppAction =
  | AdvanceSceneAction<ContentWithResponseScene>
  | ResolveAndAdvanceSceneAction;

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
const contentRenderer: ContentRenderer = {
  canRender: isPlainTextContent,
  render: (content) => (
    <PlainTextContentDisplay content={content as PlainTextContent} />
  ),
};
const interactionOptionRenderer: InteractionOptionRenderer = {
  canRender: isActionInteractionOption,
  render: (interactionOption, actionHandler) => (
    <ActionInteractionOptionDisplay
      interactionOption={interactionOption as ActionInteractionOption}
      actionHandler={actionHandler}
    />
  ),
};

export const services = {
  actionMiddleware: resolveSceneBeforeAdvanceActionMiddleware,
  contentRenderer,
  interactionOptionRenderer,
};
