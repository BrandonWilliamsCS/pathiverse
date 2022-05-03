import { Action } from "kernel/Action";
import { Scene } from "kernel/Scene";
import { encapsulateReducer } from "../state/encapsulateReducer";
import { StateCapsule } from "../state/StateCapsule";
import { StateReducer } from "../state/StateReducer";
import { isAdvanceSceneAction } from "./AdvanceSceneAction";
import { StoryState } from "./StoryState";

/**
 * Initiates a sequence of story state reductions based on a deferred sequence of actions.
 * @param initialScene - the starting scene of the story.
 * @param userStateReducer - reduces the user-side state.
 * @param initialUserState - indicates the starting value for user state.
 * @typeParam S - Describes a scene within the contextual story.
 * @typeParam U - Describes the data that represents user-side state.
 */
export function encapsulateStoryReducer<S extends Scene, U>(
  initialScene: S,
  userStateReducer: StateReducer<U>,
  initialUserState: U,
): StateCapsule<StoryState<S, U>> {
  const initialBaseState = {
    scene: initialScene,
    userState: initialUserState,
  };
  const baseReducer: StateReducer<StoryState<S, U>> = async (state, action) => {
    const [nextScene, nextUserState] = await Promise.all([
      reduceStoryState(state.scene, action),
      userStateReducer(state.userState, action),
    ]);
    // TODO: Can allow for extensions here with StateCapsule mapper.
    return { scene: nextScene, userState: nextUserState };
  };
  return encapsulateReducer(baseReducer, initialBaseState);
}

function reduceStoryState<S extends Scene>(
  scene: S,
  action: Action,
): Promise<S> {
  const nextScene = isAdvanceSceneAction<S>(action) ? action.scene : scene;
  return Promise.resolve(nextScene);
}
