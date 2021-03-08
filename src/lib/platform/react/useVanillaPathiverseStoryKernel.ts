import { Action } from "lib/Action";
import { Scene } from "lib/Scene";
import { encapsulateStoryReducer } from "lib/kernel/story/encapsulateStoryReducer";
import { Story } from "lib/kernel/story/Story";
import { StoryState } from "lib/kernel/story/StoryState";
import { ActionHandler } from "lib/kernel/ActionHandler";

/**
 * Encapsulate a Pathiverse story reducer into React state with updates based on actions and ignoring user state.
 * @param story - represents story specification, particularly the initial scene.
 * @typeParam S - Describes a scene within the contextual story.
 * @typeParam A - describes possible actions.
 */
export function useVanillaPathiverseStoryKernel<
  S extends Scene,
  A extends Action
>(story: Story<S>): [StoryState<S, undefined>, ActionHandler<A>] {
  return encapsulateStoryReducer(story, vanillaUserStateReducer, undefined);
}

const vanillaUserStateReducer = () => Promise.resolve(undefined);
