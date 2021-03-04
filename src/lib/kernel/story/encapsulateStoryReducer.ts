import { Action } from "lib/Action";
import { Scene } from "lib/Scene";
import { encapsulateReducer } from "../state/encapsulateReducer";
import { StateCapsule } from "../state/StateCapsule";
import { StateReducer } from "../state/StateReducer";
import { isAdvanceSceneAction } from "./AdvanceSceneAction";
import { Story } from "./Story";
import { StoryState } from "./StoryState";

/**
 * Initiates a sequence of story state reductions based on a deferred sequence of actions.
 * @param story - represents story specification, particularly the initial scene.
 * @param userStateReducer - reduces the user-side state.
 * @param initialUserState - indicates the starting value for user state.
 * @typeParam S - Describes a scene within the contextual story.
 * @typeParam U - Describes the data that represents user-side state.
 * @typeParam A - describes possible actions.
 */
export function encapsulateStoryReducer<S extends Scene, U, A extends Action>(
  story: Story<S>,
  userStateReducer: StateReducer<U, A>,
  initialUserState: U,
): StateCapsule<StoryState<S, U>, A> {
  const initialBaseState = {
    scene: story.initialScene,
    userState: initialUserState,
  };
  const baseReducer: StateReducer<StoryState<S, U>, A> = async (
    state,
    action,
  ) => {
    const [nextScene, nextUserState] = await Promise.all([
      reduceStoryState(state.scene, action),
      userStateReducer(state.userState, action),
    ]);
    // TODO: Can allow for extensions here with StateCapsule mapper.
    return { scene: nextScene, userState: nextUserState };
  };
  return encapsulateReducer(baseReducer, initialBaseState);
}

function reduceStoryState<S extends Scene, A extends Action>(
  scene: S,
  action: A,
): Promise<S> {
  const nextScene = isAdvanceSceneAction<S>(action) ? action.scene : scene;
  return Promise.resolve(nextScene);
}
