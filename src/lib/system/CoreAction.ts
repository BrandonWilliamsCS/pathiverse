import { Action } from "../Action";
import { State } from "../State";

export type CoreAction = InitializeAction | OverwriteAction;

export interface InitializeAction {
  type: "core.initialize";
  // StateManager specifics will need to be validated at runtime.
}
export function isInitializeAction(action: Action): action is InitializeAction {
  return action && action.type === "core.initialize";
}

export interface OverwriteAction {
  type: "core.overwrite";
  // This would be nice to type more strongly, but then it'd have to be passed everywhere.
  toState: State;
}
export function isOverwriteAction(action: Action): action is OverwriteAction {
  return action && action.type === "core.overwrite";
}
