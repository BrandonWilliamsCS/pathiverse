import { Action } from "../Action";
import { State } from "../State";

/**
 * A reducer for generating state by applying an action to previously accumulated state.
 */
export abstract class StateGenerator<S extends State> {
  public abstract apply(action: Action, prevState: S | undefined): Promise<S>;
}
