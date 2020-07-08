import { Action } from "../../Action";
import { Scene } from "../../Scene";
import { StateGenerator } from "../../kernel/StateGenerator";

/**
 * Maintains the current Scene to be presented to the user.
 */
export class SceneStateGenerator extends StateGenerator<Scene> {
  public constructor(private readonly sceneLookup: SceneLookup) {
    super();
  }

  public async apply(
    action: Action,
    prevState: Scene | undefined,
  ): Promise<Scene> {
    if (!isAdvanceSceneAction(action)) {
      if (!prevState) {
        throw new Error(
          "Must initialize Scene before processing other actions.",
        );
      }
      return prevState;
    }
    const nextScene = await this.sceneLookup(action.nextSceneName);
    return nextScene;
  }
}

export type SceneLookup = (name: string) => Promise<Scene>;

export type SceneStateGeneratorAction = AdvanceSceneAction;

export interface AdvanceSceneAction extends Action {
  type: "scene.advance";
  nextSceneName: string;
}
export function isAdvanceSceneAction(
  action: Action,
): action is AdvanceSceneAction {
  return action && action.type === "scene.advance";
}
