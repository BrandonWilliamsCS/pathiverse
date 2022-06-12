import { Scene } from "../../kernel/Scene";
import {
  AdvanceSceneAction,
  advanceSceneActionType,
} from "../../kernel/story/AdvanceSceneAction";
import { ActionTransformer } from "../ActionTransformer";
import { ResourceIndicator } from "../resource/ResourceIndicator";
import { isResolveAndAdvanceSceneAction } from "./ResolveAndAdvanceSceneAction";

export function buildResolveSceneBeforeAdvanceActionTransformer<
  Sc extends Scene,
>(
  sceneReader: (indicator: ResourceIndicator) => Promise<Sc>,
): ActionTransformer {
  return async (action) => {
    if (!isResolveAndAdvanceSceneAction(action)) {
      return action;
    }
    const scene = await sceneReader(action.sceneIndicator);
    return {
      type: advanceSceneActionType,
      scene,
    } as AdvanceSceneAction<Sc>;
  };
}
