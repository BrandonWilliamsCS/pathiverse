import { Scene } from "kernel/Scene";
import {
  AdvanceSceneAction,
  advanceSceneActionType,
} from "kernel/story/AdvanceSceneAction";
import { ActionTransformer } from "../ActionTransformer";
import { ResourceReader } from "../resource/ResourceReader";
import { isResolveAndAdvanceSceneAction } from "./ResolveAndAdvanceSceneAction";

export function buildResolveSceneBeforeAdvanceActionTransformer<
  Sc extends Scene,
>(sceneReader: ResourceReader<Sc>): ActionTransformer {
  return async (action) => {
    if (!isResolveAndAdvanceSceneAction(action)) {
      return action;
    }
    const scene = await sceneReader.getResource(action.sceneIndicator);
    return {
      type: advanceSceneActionType,
      scene,
    } as AdvanceSceneAction<Sc>;
  };
}
