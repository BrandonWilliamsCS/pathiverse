import { Action } from "kernel/Action";
import { ResourceIndicator } from "./resource/ResourceIndicator";

/** Describes an action that advances to a new scene after first resolving from an indicator. */
export const resolveAndAdvanceSceneStoryType =
  "pathiverse.action.resolveAndAdvanceScene" as const;

/** Communicates that the current scene should advance to a new scene after first resolving from an indicator. */
export interface ResolveAndAdvanceSceneAction extends Action {
  type: typeof resolveAndAdvanceSceneStoryType;
  sceneIndicator: ResourceIndicator;
}

/** Detects whether an action is of the "resolve and advance scene" variety. */
export function isResolveAndAdvanceSceneAction(
  action: Action,
): action is ResolveAndAdvanceSceneAction {
  return action && action.type === resolveAndAdvanceSceneStoryType;
}
