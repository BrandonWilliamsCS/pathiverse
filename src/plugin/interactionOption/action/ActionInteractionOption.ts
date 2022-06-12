import { Action } from "pathiverse/kernel/Action";
import { InterfaceElement } from "pathiverse/system/InterfaceElement";

/** Describes an interaction option that represents a specific action */
export const actionInteractionOptionType =
  "pathiverse.interactionOption.action" as const;

/** An interaction option that represents a specific action. */
export interface ActionInteractionOption extends InterfaceElement {
  type: typeof actionInteractionOptionType;
  label: string;
  action: Action;
}

/** Detects whether an interaction option is of the "action" variety. */
export function isActionInteractionOption(
  action: Action,
): action is ActionInteractionOption {
  return action && action.type === actionInteractionOptionType;
}
