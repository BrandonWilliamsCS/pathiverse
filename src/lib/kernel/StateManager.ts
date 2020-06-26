import { Action } from "../Action";
import { State } from "../State";

/**
 * A steward of some piece of data as well as how incoming actions affect that data.
 */
export abstract class StateManager<S extends State> {
  protected abstract get initialState(): S;
  private latestState: S | undefined;

  public get currentState(): S {
    return this.latestState ?? this.initialState;
  }

  protected abstract generateNewState(action: Action): Promise<S>;

  public async apply(action: Action): Promise<S> {
    const nextState = await this.generateNewState(action);
    this.latestState = nextState;
    return nextState;
  }
}
