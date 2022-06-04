import React from "react";

import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import { isIndicatedContent, IndicatedContent } from "./IndicatedContent";
import { IndicatedContentDisplay } from "./IndicatedContentDisplay";

export const indicatedContentRenderer: InterfaceElementRenderer<any> = {
  canRender: isIndicatedContent,
  render: ({
    interfaceElement,
    state,
    actionHandler,
    interfaceElementRenderer,
  }) => (
    <IndicatedContentDisplay
      content={interfaceElement as IndicatedContent}
      state={state}
      actionHandler={actionHandler}
      interfaceElementRenderer={interfaceElementRenderer}
    />
  ),
};
