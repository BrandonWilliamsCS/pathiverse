import { Action } from "../../Action";
import { State } from "../../State";
import { StateManager } from "../../kernel/StateManager";

/**
 * Combines a pair of StateManagers for World and Session state into one.
 */
export class SessionSplitStateManager<
  SSession extends State,
  SWorld extends State
> extends StateManager<SSession & SWorld> {
  protected readonly initialState = this.join(
    this.sessionStateManager.currentState,
    this.worldStateManager.currentState,
  );

  public constructor(
    private readonly sessionStateManager: StateManager<SSession>,
    private readonly worldStateManager: StateManager<SWorld>,
  ) {
    super();
  }

  protected async generateNewState(action: Action): Promise<SSession & SWorld> {
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
