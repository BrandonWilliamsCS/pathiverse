import { Action } from "../../Action";
import { Scene } from "../../Scene";
import { StateManager } from "../../kernel/StateManager";

/**
 * Manages the current Scene to be presented to the user.
 */
export class SceneStateManager extends StateManager<Scene> {
  public constructor(
    protected readonly initialState: Scene,
    private readonly sceneLookup: SceneLookup,
  ) {
    super();
  }

  protected async generateNewState(action: Action): Promise<Scene> {
    if (!isAdvanceSceneAction(action)) {
      return this.currentState;
    }
    const nextScene = await this.sceneLookup(action.nextSceneName);
    return nextScene;
  }
}

export type SceneLookup = (name: string) => Promise<Scene>;

export type SceneStateManagerAction = AdvanceSceneAction;

export interface AdvanceSceneAction extends Action {
  type: "scene.advance";
  nextSceneName: string;
}
export function isAdvanceSceneAction(
  action: any,
): action is AdvanceSceneAction {
  return action && action.type === "scene.advance";
}
