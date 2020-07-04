import { Action } from "../../Action";
import { State } from "../../State";
import { StateManager } from "../../kernel/StateManager";
import { InitializeAction, isInitializeAction } from "../CoreAction";

export abstract class InitializableStateManager<
  S extends State
> extends StateManager<S> {
  protected abstract generateInititalState(
    initializeAction: InitializeAction,
  ): Promise<S>;
  protected abstract generateNextState(action: Action): Promise<S>;

  protected generateNewState(action: Action): Promise<S> {
    return isInitializeAction(action)
      ? this.generateInititalState(action)
      : this.generateNextState(action);
  }
}
