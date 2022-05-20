import { Scene } from "kernel/Scene";
import { StoryState } from "kernel/story/StoryState";
import { StateSessionTracker } from "system/StateSessionTracker";
import { StorySpecification } from "system/StorySpecification";

export interface Session<Sc extends Scene, U> {
  stateSessionTracker: StateSessionTracker<StoryState<Sc, U>>;
  storySpecification: StorySpecification<U>;
}
