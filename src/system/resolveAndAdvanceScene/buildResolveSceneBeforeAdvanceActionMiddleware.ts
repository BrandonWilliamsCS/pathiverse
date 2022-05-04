import {
  AdvanceSceneAction,
  advanceSceneActionType,
} from "kernel/story/AdvanceSceneAction";
import { ActionMiddleware } from "../ActionMiddleware";
import { ResourceReader } from "../resource/ResourceReader";
import { isResolveAndAdvanceSceneAction } from "./ResolveAndAdvanceSceneAction";

export function buildResolveSceneBeforeAdvanceActionMiddleware<Sc>(
  sceneReader: ResourceReader<Sc>,
): ActionMiddleware<any> {
  return async (action, next) => {
    if (!isResolveAndAdvanceSceneAction(action)) {
      return await next(action);
    }
    const scene = await sceneReader.getResource(action.sceneIndicator);
    return await next({
      type: advanceSceneActionType,
      scene,
    } as AdvanceSceneAction<any>);
  };
}
