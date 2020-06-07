import { Scene } from "./Scene";

export type State = any;

export interface SceneState<AType extends string, CType extends string> {
  currentScene: Scene<AType, CType>;
}
