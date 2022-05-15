import { BehaviorSubject, map, Observable } from "rxjs";

import { Action } from "kernel/Action";
import { StateCapsule } from "kernel/state/StateCapsule";
import { ActionTransformer } from "./ActionTransformer";

/**
 * Maintains a single session of state as actions are applied to an initial `StateCapsule`.
 * @typeParam S - Represents the state values possible during this session
 */
export class StorySession<S> {
  private readonly stateCapsuleSubject: BehaviorSubject<StateCapsule<S>>;

  public get currentState(): S {
    return this.stateCapsuleSubject.value[0];
  }

  public get states(): Observable<S> {
    return this.stateCapsuleSubject.pipe(map(([state]) => state));
  }

  public constructor(
    initialStateCapsule: StateCapsule<S>,
    private readonly actionTransformer?: ActionTransformer,
  ) {
    this.stateCapsuleSubject = new BehaviorSubject(initialStateCapsule);
  }

  public async applyAction(action: Action) {
    const [, actionApplier] = this.stateCapsuleSubject.value;
    const transformedAction = this.actionTransformer
      ? await this.actionTransformer(action)
      : action;
    const newCapsule = actionApplier(transformedAction);
    this.stateCapsuleSubject.next(newCapsule);
  }
}
