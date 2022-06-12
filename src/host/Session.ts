import { Scene } from "pathiverse/kernel/Scene";
import { StoryState } from "pathiverse/kernel/story/StoryState";
import { StateSessionTracker } from "pathiverse/system/StateSessionTracker";
import { StorySpecification } from "pathiverse/system/StorySpecification";

export interface Session<Sc extends Scene, U> {
  stateSessionTracker: StateSessionTracker<StoryState<Sc, U>>;
  storySpecification: StorySpecification<U>;
}
