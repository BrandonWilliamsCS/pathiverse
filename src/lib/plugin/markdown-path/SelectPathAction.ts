import { Action } from "lib/Action";
import {
  AdvanceSceneAction,
  isAdvanceSceneAction,
} from "lib/system/state/SceneStateGenerator";

export interface SelectPathAction extends AdvanceSceneAction {
  label: string;
}

export function isSelectPathAction(action: Action): action is SelectPathAction {
  return isAdvanceSceneAction(action) && !!(action as SelectPathAction).label;
}
