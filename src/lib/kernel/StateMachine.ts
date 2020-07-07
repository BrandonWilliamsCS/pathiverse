import { Action } from "../Action";
import { SceneState } from "../State";
import { ActionHandler } from "./ActionHandler";
import { ContentResovler } from "./ContentResolver";
import { Renderer } from "./Renderer";
import { StateGenerator } from "./StateGenerator";

/**
 * The core mechanic for an action-based state machine.
 * Current state is presented to a renderer, which presents actions that ultimately update state and restart the cycle.
 */
export class StateMachine<S extends SceneState> {
  private state: S | undefined;

  constructor(
    private readonly stateGenerator: StateGenerator<S>,
    private readonly resolveContent: ContentResovler,
    private readonly render: Renderer<S>,
  ) {}

  public start(initializationAction: Action): void {
    // Ensure that this function returns right away to suggest a successful start.
    // In other words, don't let someone await this in the hopes of reaching "the end".
    (async () => {
      let statePromise = this.stateGenerator.apply(
        initializationAction,
        this.state,
      );
      // TODO: support some sort of cancellation
      while (true) {
        // First get the stuff to be rendered
        this.state = await statePromise;
        const nextContent = await this.resolveContent(
          this.state.currentScene.contentIndicator,
        );
        let actionHandler: ActionHandler;
        // Then split the state manager into:
        [
          // a generic handler to pass to the renderer,
          actionHandler,
          // and a promise that resolves with the state that comes from its application.
          statePromise,
        ] = this.splitStateGeneratorApplication();
        // Finally, pass everything along and let the cycle continue.
        this.render(this.state, nextContent, actionHandler);
      }
    })();
  }

  private splitStateGeneratorApplication(): [ActionHandler, Promise<S>] {
    // Finagle the resolver from the promise so we can use it as the action handler.
    let actionHandler!: (action: Action) => void;
    const statePromise = new Promise<Action>((resolve) => {
      actionHandler = resolve;
    }).then((action) => this.stateGenerator.apply(action, this.state));
    // The consumer can pass the handler along and listen for when it's called.
    return [actionHandler, statePromise];
  }
}
