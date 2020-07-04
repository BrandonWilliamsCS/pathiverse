import { Action } from "../../Action";
import { Scene } from "../../Scene";
import { InitializeAction, isInitializeAction } from "../CoreAction";
import { InitializableStateManager } from "./InitializableStateManager";

/**
 * Manages the current Scene to be presented to the user.
 */
export class SceneStateManager extends InitializableStateManager<Scene> {
  public constructor(private readonly sceneLookup: SceneLookup) {
    super();
  }

  protected async generateInititalState(
    action: InitializeAction,
  ): Promise<Scene> {
    if (!isInitializeSceneAction(action)) {
      throw new Error("Cannot initialize scene without `initialSceneName`.");
    }
    const nextScene = await this.sceneLookup(action.initialSceneName);
    return nextScene;
  }

  protected async generateNextState(action: Action): Promise<Scene> {
    if (!isAdvanceSceneAction(action)) {
      return this.currentState;
    }
    const nextScene = await this.sceneLookup(action.nextSceneName);
    return nextScene;
  }
}

export type SceneLookup = (name: string) => Promise<Scene>;

export type SceneStateManagerAction = AdvanceSceneAction;

export interface InitializeSceneAction extends InitializeAction {
  initialSceneName: string;
}
export function isInitializeSceneAction(
  action: InitializeAction,
): action is InitializeSceneAction {
  return isInitializeAction(action) && !!(action as any).initialSceneName;
}

export interface AdvanceSceneAction extends Action {
  type: "scene.advance";
  nextSceneName: string;
}
export function isAdvanceSceneAction(
  action: Action,
): action is AdvanceSceneAction {
  return action && action.type === "scene.advance";
}
