import React from "react";

import { Action } from "kernel/Action";
import { ActionInteractionOption } from "./ActionInteractionOption";

export interface ActionInteractionOptionDisplayProps {
  interactionOption: ActionInteractionOption;
  actionHandler: (action: Action) => void;
}

/** Renders a button that applies the interaction option's action when clicked. */
export const ActionInteractionOptionDisplay: React.FC<
  ActionInteractionOptionDisplayProps
> = ({ actionHandler, interactionOption }) => {
  return (
    <button
      className="actionInteractionOption"
      onClick={() => {
        actionHandler(interactionOption.action);
      }}
    >
      {interactionOption.label}
    </button>
  );
};
