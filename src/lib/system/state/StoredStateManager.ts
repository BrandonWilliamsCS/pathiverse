import { Action } from "../../Action";
import { State } from "../../State";
import { StateManager } from "../../kernel/StateManager";
import { Storage } from "../storage/Storage";

/**
 * Wraps another StateManager such that each new state gets written to storage.
 */
export class StoredStateManager<S extends State> extends StateManager<S> {
  public get currentState(): S {
    return this.underlyingManager.currentState;
  }

  public constructor(
    private readonly underlyingManager: StateManager<S>,
    private readonly storage: Storage<S>,
  ) {
    super();
  }

  public async apply(action: Action): Promise<S> {
    const resultState = await this.underlyingManager.apply(action);
    await this.storage.writeValue(resultState);
    return resultState;
  }
}
