import { Action } from "../Action";

/**
 * A low-level abstraction for responding to actions of a specified type.
 */
export type ActionHandler<AType extends string> = (
  action: Action<AType>,
) => void;
