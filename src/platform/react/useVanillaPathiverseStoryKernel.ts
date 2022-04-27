import { Action } from "kernel/Action";
import { Scene } from "kernel/Scene";
import { ActionApplier } from "kernel/state/ActionApplier";
import { encapsulateStoryReducer } from "kernel/story/encapsulateStoryReducer";
import { StoryState } from "kernel/story/StoryState";

/**
 * Encapsulate a Pathiverse story reducer into React state with updates based on actions and ignoring user state.
 * @param initialScene - the starting scene of the story.
 * @typeParam S - Describes a scene within the contextual story.
 * @typeParam A - describes possible actions.
 */
export function useVanillaPathiverseStoryKernel<
  S extends Scene,
  A extends Action,
>(
  initialScene: S,
): [StoryState<S, undefined>, ActionApplier<StoryState<S, undefined>, A>] {
  return encapsulateStoryReducer(
    initialScene,
    vanillaUserStateReducer,
    undefined,
  );
}

const vanillaUserStateReducer = () => Promise.resolve(undefined);
