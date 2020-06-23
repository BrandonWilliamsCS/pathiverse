import { Action } from "../Action";
import { State } from "../State";

/**
 * A steward of some piece of data as well as how incoming actions affect that data.
 */
export abstract class StateManager<S extends State> {
  public abstract get currentState(): S;
  public abstract apply(action: Action): Promise<S>;
}
