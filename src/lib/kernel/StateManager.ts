import { Action } from "../Action";
import { ActionHandler } from "./ActionHandler";

export abstract class StateManager<AType extends string, S>
  implements ActionHandler<AType> {
  public abstract get currentState(): S;

  public abstract canHandle(actionType: string): actionType is AType;
  public abstract apply(action: Action<AType>): S;

  public handle(action: Action<AType>): void {
    if (this.canHandle(action.type)) {
      this.apply(action);
    }
  }
}
