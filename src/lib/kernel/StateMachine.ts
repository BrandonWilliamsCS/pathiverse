import { BehaviorSubject, Subject, Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { Action } from "../Action";
import { Renderer } from "./Renderer";
import { StateManager } from "./StateManager";

export class StateMachine<AType extends string, S> {
  private readonly stateSubject: BehaviorSubject<S>;
  private readonly subscription: Subscription

  public get currentState(): S {
    return this.stateSubject.value;
  }

  public get stateStream(): Observable<S> {
    return this.stateSubject;
  }

  constructor(
    stateManager: StateManager<AType, S>,
    render: Renderer<AType, S>,
  ) {
    this.stateSubject = new BehaviorSubject<S>(stateManager.currentState);
    const actionObserver = new Subject<Action<AType>>();
    const actionHandlerForRenderer = {
      canHandle: stateManager.canHandle.bind(stateManager),
      handle: actionObserver.next,
    };

    this.subscription = actionObserver
      .pipe(map((action) => stateManager.apply(action)))
      .subscribe((newState) => {
        render(newState, actionHandlerForRenderer);
      });
  }

  public dispose() {
    this.subscription.unsubscribe();
  }
}
