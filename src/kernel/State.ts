import { Scene } from "./Scene";

/**
 * Any data that might inform specifics about Scene presentation or interaction.
 * For example, a side effect or piece of knowledge that opens a new path.
 */
export type State = { [key: string]: any };

/**
 * State that explicitly includes a specification for the "current" Scene.
 */
export interface SceneState extends State {
  currentScene: Scene;
}
