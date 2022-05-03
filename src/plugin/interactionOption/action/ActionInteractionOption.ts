import { Action } from "kernel/Action";
import { InteractionOption } from "system/InteractionOption";

/** Describes an interaction option that represents a specific action */
export const actionInteractionOptionType =
  "pathiverse.interactionOption.action" as const;

/** An interaction option that represents a specific action. */
export interface ActionInteractionOption extends InteractionOption {
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
