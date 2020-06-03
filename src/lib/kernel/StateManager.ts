import { Action } from "../Action";
import { State } from "../State";
import { ActionHandler } from "./ActionHandler";

export abstract class StateManager<
  AType extends string,
  CType extends string,
  S extends State<AType, CType>
> implements ActionHandler<AType> {
  public abstract get currentState(): S;

  public abstract canHandle(actionType: string): actionType is AType;
  public abstract apply(action: Action<AType>): Promise<S>;

  public handle(action: Action<AType>): void {
    if (this.canHandle(action.type)) {
      this.apply(action);
    }
  }
}
