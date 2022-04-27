import { Scene } from "../Scene";

/** 
 * Describes a Pathiverse story structure.
 * @typeParam S - Describes a scene within the contextual story.
 */
export interface Story<S extends Scene> {
  initialScene: S;
}
