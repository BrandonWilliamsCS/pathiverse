import { ActionHandler } from "./ActionHandler";

export type Renderer<AType extends string, S> = (
  currentState: S,
  actionHandler: ActionHandler<AType>,
) => void;
