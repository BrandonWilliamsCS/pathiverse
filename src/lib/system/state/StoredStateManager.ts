import { Action } from "../../Action";
import { State } from "../../State";
import { StateManager } from "../../kernel/StateManager";
import { OverwriteAction } from "../CoreAction";
import { Storage } from "../storage/Storage";

/**
 * Wraps another StateManager such that each new state gets written to storage.
 */
export class StoredStateManager<S extends State> extends StateManager<S> {
  protected readonly initialState = this.underlyingManager.currentState;

  public constructor(
    private readonly underlyingManager: StateManager<S>,
    private readonly storage: Storage<S>,
  ) {
    super();
  }

  protected async generateNewState(action: Action): Promise<S> {
    if (isLoadStoredStateAction(action)) {
      // Loading is a special case, handled only at this level and translated to those below.
      const loadedState = await this.storage.readValue();
      const overwriteAction: OverwriteAction = {
        type: "core.overwrite",
        toState: loadedState,
      };
      const overwrittenState = await this.underlyingManager.apply(
        overwriteAction,
      );
      return overwrittenState;
    }
    const resultState = await this.underlyingManager.apply(action);
    await this.storage.writeValue(resultState);
    return resultState;
  }
}

export type StoredStateManagerAction = LoadStoredStateAction;

export interface LoadStoredStateAction extends Action {
  type: "storage.load";
}
export function isLoadStoredStateAction(
  action: any,
): action is LoadStoredStateAction {
  return action && action.type === "storage.load";
}
