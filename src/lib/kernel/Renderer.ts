import { Content } from "../Content";
import { SceneState } from "../State";
import { ActionHandler } from "./ActionHandler";

export type Renderer<
  AType extends string,
  CType extends string,
  S extends SceneState<AType, CType>
> = (
  currentState: S,
  content: Content<CType>,
  actionHandler: ActionHandler<AType>,
) => Promise<void>;
