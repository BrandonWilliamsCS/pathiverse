import { Action } from "../Action";
import { State } from "../State";
import { ActionHandler } from "./ActionHandler";
import { ContentResovler } from "./ContentResolver";
import { Renderer } from "./Renderer";
import { StateManager } from "./StateManager";

export class StateMachine<
  AType extends string,
  CType extends string,
  S extends State<AType, CType>
> {
  public get currentState(): S {
    return this.stateManager.currentState;
  }

  constructor(
    private readonly stateManager: StateManager<AType, CType, S>,
    private readonly resolveContent: ContentResovler<CType>,
    private readonly render: Renderer<AType, CType, S>,
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
      let actionHandler: ActionHandler<AType>;
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

  private splitStateManagerApplication(): [ActionHandler<AType>, Promise<S>] {
    // Finagle the resolver from the promise so we can use it as the action handler.
    let handle!: (action: Action<AType>) => void;
    const statePromise = new Promise<Action<AType>>((resolve) => {
      handle = resolve;
    }).then((action) => this.stateManager.apply(action));
    // The consumer can pass the handler along and listen for when it's called.
    const actionHandler: ActionHandler<AType> = {
      canHandle: this.stateManager.canHandle.bind(this.stateManager),
      handle,
    };
    return [actionHandler, statePromise];
  }
}
