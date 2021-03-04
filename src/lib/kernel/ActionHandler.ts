import { Action } from "../Action";

/**
 * A low-level abstraction for responding to actions of a specified type.
 */
export type ActionHandler<A extends Action = Action> = (action: A) => void;
