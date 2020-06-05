import { Action } from "../Action";

export type ActionHandler<AType extends string> = (
  action: Action<AType>,
) => void;
