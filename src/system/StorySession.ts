import { BehaviorSubject, map, Observable } from "rxjs";

import { Action } from "kernel/Action";
import { StateCapsule } from "kernel/state/StateCapsule";

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

  public constructor(initialStateCapsule: StateCapsule<S>) {
    this.stateCapsuleSubject = new BehaviorSubject(initialStateCapsule);
  }

  public applyAction(action: Action): void {
    const [, actionApplier] = this.stateCapsuleSubject.value;
    const newCapsule = actionApplier(action);
    this.stateCapsuleSubject.next(newCapsule);
  }
}
