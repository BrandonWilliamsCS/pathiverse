import React from "react";

import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import {
  isContentWithResponseScene,
  ContentWithResponseScene,
} from "./ContentWithResponseScene";
import { ContentWithResponseStage } from "./ContentWithResponseStage";

export const contentWithResponseSceneRenderer: InterfaceElementRenderer = {
  canRender: isContentWithResponseScene,
  render: (scene, actionHandler, interfaceElementRenderer) => (
    <ContentWithResponseStage
      scene={scene as ContentWithResponseScene}
      actionHandler={actionHandler}
      interfaceElementRenderer={interfaceElementRenderer}
    />
  ),
};
