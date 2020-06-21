import { Action } from "../../Action";
import { State } from "../../State";
import { StateManager } from "../../kernel/StateManager";

/**
 * Combines a pair of StateManagers for World and Session state into one.
 */
export class SessionSplitStateManager<
  AType extends string,
  SSession extends State,
  SWorld extends State
> extends StateManager<AType, SSession & SWorld> {
  public get currentState(): SSession & SWorld {
    const sessionState = this.sessionStateManager.currentState;
    const worldState = this.worldStateManager.currentState;
    return this.join(sessionState, worldState);
  }

  public constructor(
    private readonly sessionStateManager: StateManager<AType, SSession>,
    private readonly worldStateManager: StateManager<AType, SWorld>,
  ) {
    super();
  }

  public async apply(action: Action<AType>): Promise<SSession & SWorld> {
    const sessionState = await this.sessionStateManager.apply(action);
    const worldState = await this.worldStateManager.apply(action);
    return this.join(sessionState, worldState);
  }

  public join(sessionState: SSession, worldState: SWorld): SSession & SWorld {
    // By default (i.e., unless overridden), just go key by key
    //  and have "session" override "world".
    return {
      ...worldState,
      ...sessionState,
    };
  }
}
