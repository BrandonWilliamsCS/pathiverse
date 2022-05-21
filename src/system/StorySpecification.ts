import { ResourceIndicator } from "./resource/ResourceIndicator";

export interface StorySpecification<U> {
  id: string;
  name: string;
  relativeSceneRoot: ResourceIndicator;
  initialSceneIndicator: ResourceIndicator;
  initialUserState: U;
}
