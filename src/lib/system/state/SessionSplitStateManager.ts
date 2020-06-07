import { Action } from "../../Action";
import { StateManager } from "../../kernel/StateManager";

/**
 * Combines a pair of StateManagers for World and Session state into one.
 */
export class SessionSplitStateManager<
  AType extends string,
  S
> extends StateManager<AType, S> {
  public get currentState(): S {
    const sessionState = this.sessionStateManager.currentState;
    const worldState = this.worldStateManager.currentState;
    return this.join(sessionState, worldState);
  }

  public constructor(
    private readonly sessionStateManager: StateManager<AType, S>,
    private readonly worldStateManager: StateManager<AType, S>,
  ) {
    super();
  }

  public async apply(action: Action<AType>): Promise<S> {
    const sessionState = await this.sessionStateManager.apply(action);
    const worldState = await this.worldStateManager.apply(action);
    return this.join(sessionState, worldState);
  }

  public join(sessionState: S, worldState: S): S {
    // By default (i.e., unless overridden), just go key by key
    //  and have "session" override "world".
    return {
      ...worldState,
      ...sessionState,
    };
  }
}
