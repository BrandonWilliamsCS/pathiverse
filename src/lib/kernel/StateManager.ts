import { Action } from "../Action";
import { State } from "../State";

export abstract class StateManager<AType extends string, S extends State> {
  public abstract get currentState(): S;
  public abstract apply(action: Action<AType>): Promise<S>;
}
