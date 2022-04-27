import { Scene } from "../Scene";

/** 
 * Describes a Pathiverse state that's built around scene-based story structures.
 * @typeParam S - Describes a scene within the contextual story.
 * @typeParam U - Describes the data that represents user-side state.
 */
export interface StoryState<S extends Scene, U> {
  scene: S;
  userState: U;
}
