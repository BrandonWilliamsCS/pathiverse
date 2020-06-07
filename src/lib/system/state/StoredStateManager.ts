import { Action } from "../../Action";
import { StateManager } from "../../kernel/StateManager";
import { Storage } from "../storage/Storage";

/**
 * Wraps another StateManager such that each new state gets written to storage.
 */
export class StoredStateManager<AType extends string, S> extends StateManager<
  AType,
  S
> {
  public get currentState(): S {
    return this.underlyingManager.currentState;
  }

  public constructor(
    private readonly underlyingManager: StateManager<AType, S>,
    private readonly storage: Storage<S>,
  ) {
    super();
  }

  public async apply(action: Action<AType>): Promise<S> {
    const resultState = await this.underlyingManager.apply(action);
    await this.storage.writeValue(resultState);
    return resultState;
  }
}
