import { Action } from "kernel/Action";
import { Scene } from "../Scene";

/** Describes an action that advances to a new scene */
export const advanceSceneActionType = "pathiverse.action.advanceScene" as const;

/**
 * Communicates that the current scene should advance to a new scene.
 * @typeParam S - describes what is included in a possible scene.
 */
export interface AdvanceSceneAction<S extends Scene> extends Action {
  type: typeof advanceSceneActionType;
  scene: S;
}

/** Detects whether an action is of the "advance scene" variety. */
export function isAdvanceSceneAction<S extends Scene>(
  action: Action,
): action is AdvanceSceneAction<S> {
  return action && action.type === advanceSceneActionType;
}
