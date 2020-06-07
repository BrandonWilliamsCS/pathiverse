import { Scene } from "./Scene";

export type State = { [key: string]: any };

export interface SceneState<AType extends string, CType extends string>
  extends State {
  currentScene: Scene<AType, CType>;
}
