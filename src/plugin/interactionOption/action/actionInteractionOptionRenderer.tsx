import React from "react";

import { InterfaceElementRenderer } from "platform/react/InterfaceElementRenderer";
import {
  ActionInteractionOption,
  isActionInteractionOption,
} from "./ActionInteractionOption";
import { ActionInteractionOptionDisplay } from "./ActionInteractionOptionDisplay";

export const actionInteractionOptionRenderer: InterfaceElementRenderer<any> = {
  canRender: isActionInteractionOption,
  render: ({ interfaceElement, actionHandler }) => (
    <ActionInteractionOptionDisplay
      interactionOption={interfaceElement as ActionInteractionOption}
      actionHandler={actionHandler}
    />
  ),
};
