import React from "react";

import { Action } from "lib/Action";
import { Scene } from "lib/Scene";
import { StateCapsule } from "lib/kernel/state/StateCapsule";
import { StateReducer } from "lib/kernel/state/StateReducer";
import { encapsulateStoryReducer } from "lib/kernel/story/encapsulateStoryReducer";
import { Story } from "lib/kernel/story/Story";
import { StoryState } from "lib/kernel/story/StoryState";
import { ActionHandler } from "lib/kernel/ActionHandler";

/**
 * Encapsulate a Pathiverse story reducer into React state with updates based on actions.
 * @param story - represents story specification, particularly the initial scene.
 * @param userStateReducer - reduces the user-side state.
 * @param initialUserState - indicates the starting value for user state.
 * @typeParam S - Describes a scene within the contextual story.
 * @typeParam U - Describes the data that represents user-side state.
 * @typeParam A - describes possible actions.
 */
export function usePathiverseStoryKernel<S extends Scene, U, A extends Action>(
  story: Story<S>,
  userStateReducer: StateReducer<U, A>,
  initialUserState: U,
): [StoryState<S, U>, ActionHandler<A>] {
  const [currentCapsule, setCurrentCapsule] = React.useState(() =>
    encapsulateStoryReducer(story, userStateReducer, initialUserState),
  );
  const [storyState, actionApplier] = currentCapsule;
  const actionHandler = async (action: A) => {
    const nextCapsule = await actionApplier(action);
    setCurrentCapsule(nextCapsule);
  };
  return [storyState, actionHandler];
}
