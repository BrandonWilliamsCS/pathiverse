import { Action } from "../Action";
import { SceneState } from "../State";
import { ActionHandler } from "./ActionHandler";
import { ContentResovler } from "./ContentResolver";
import { Renderer } from "./Renderer";
import { StateManager } from "./StateManager";

/**
 * The core mechanic for an action-based state machine.
 * Current state is presented to a renderer, which presents actions that ultimately update state and restart the cycle.
 */
export class StateMachine<
  CType extends string,
  S extends SceneState<CType>
> {
  public get currentState(): S {
    return this.stateManager.currentState;
  }

  constructor(
    private readonly stateManager: StateManager<S>,
    private readonly resolveContent: ContentResovler<CType>,
    private readonly render: Renderer<CType, S>,
  ) {}

  public async start() {
    let statePromise = Promise.resolve(this.stateManager.currentState);
    // TODO: support some sort of cancellation
    while (true) {
      // First get the stuff to be rendered
      const nextState = await statePromise;
      const nextContent = await this.resolveContent(
        nextState.currentScene.contentIndicator,
      );
      let actionHandler: ActionHandler;
      // Then split the state manager into:
      [
        // a generic handler to pass to the renderer,
        actionHandler,
        // and a promise that resolves with the state that comes from its application.
        statePromise,
      ] = this.splitStateManagerApplication();
      // Finally, pass everything along and let the cycle continue.
      this.render(nextState, nextContent, actionHandler);
    }
  }

  private splitStateManagerApplication(): [ActionHandler, Promise<S>] {
    // Finagle the resolver from the promise so we can use it as the action handler.
    let actionHandler!: (action: Action) => void;
    const statePromise = new Promise<Action>((resolve) => {
      actionHandler = resolve;
    }).then((action) => this.stateManager.apply(action));
    // The consumer can pass the handler along and listen for when it's called.
    return [actionHandler, statePromise];
  }
}
