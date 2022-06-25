import { SessionPathiverseModel } from "platform/react/SessionPathiverseModel";
import { Scene } from "../../kernel/Scene";
import {
  AdvanceSceneAction,
  advanceSceneActionType,
} from "../../kernel/story/AdvanceSceneAction";
import { ActionTransformer } from "../ActionTransformer";
import { isResolveAndAdvanceSceneAction } from "./ResolveAndAdvanceSceneAction";

export function buildResolveSceneBeforeAdvanceActionTransformer<
  Sc extends Scene,
  U,
>(sessionPathiverseModel: SessionPathiverseModel<Sc, U>): ActionTransformer {
  return async (action) => {
    if (!isResolveAndAdvanceSceneAction(action)) {
      return action;
    }
    const scene = await sessionPathiverseModel
      .getScene(action.sceneIndicator)
      .promiseNewestValue();
    return {
      type: advanceSceneActionType,
      scene,
    } as AdvanceSceneAction<Sc>;
  };
}
