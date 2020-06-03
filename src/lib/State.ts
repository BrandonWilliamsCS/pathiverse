import { Scene } from "./Scene";

export interface State<AType extends string, CType extends string> {
  currentScene: Scene<AType, CType>;
}
