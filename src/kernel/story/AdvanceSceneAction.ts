import { Action } from "kernel/Action";
import { Scene } from "../Scene";

export interface AdvanceSceneAction<S extends Scene> extends Action {
  type: "pathiverse.story.advanceScene";
  scene: S;
}

export function isAdvanceSceneAction<S extends Scene>(
  action: Action,
): action is AdvanceSceneAction<S> {
  return action && action.type === "pathiverse.story.advanceScene";
}
