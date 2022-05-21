import React from "react";

import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import {
  isContentWithResponseScene,
  ContentWithResponseScene,
} from "./ContentWithResponseScene";
import { ContentWithResponseStage } from "./ContentWithResponseStage";

export const contentWithResponseSceneRenderer: InterfaceElementRenderer<any> = {
  canRender: isContentWithResponseScene,
  render: ({
    interfaceElement,
    state,
    actionHandler,
    interfaceElementRenderer,
  }) => (
    <ContentWithResponseStage<any>
      scene={interfaceElement as ContentWithResponseScene}
      state={state}
      actionHandler={actionHandler}
      interfaceElementRenderer={interfaceElementRenderer}
    />
  ),
};
