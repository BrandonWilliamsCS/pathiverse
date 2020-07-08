import { Action } from "../../Action";
import { State } from "../../State";
import { StateGenerator } from "../../kernel/StateGenerator";

/**
 * Combines a pair of StateGenerators for World and Session state into one.
 */
export class SessionSplitStateGenerator<
  SSession extends State,
  SWorld extends State
> extends StateGenerator<SessionSplitState<SSession, SWorld>> {
  public constructor(
    private readonly sessionStateGenerator: StateGenerator<SSession>,
    private readonly worldStateGenerator: StateGenerator<SWorld>,
  ) {
    super();
  }

  public async apply(
    action: Action,
    prevState: SessionSplitState<SSession, SWorld> | undefined,
  ): Promise<SessionSplitState<SSession, SWorld>> {
    const worldState = await this.worldStateGenerator.apply(
      action,
      prevState?.[1],
    );
    const sessionState = await this.sessionStateGenerator.apply(
      action,
      prevState?.[2],
    );
    const joinedState = this.join(sessionState, worldState);
    return [joinedState, worldState, sessionState];
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

export type SessionSplitState<SSession, SWorld> = [
  SSession & SWorld,
  SWorld,
  SSession,
];
