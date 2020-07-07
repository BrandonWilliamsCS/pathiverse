import { Action } from "../../Action";
import { State } from "../../State";
import { StateGenerator } from "../../kernel/StateGenerator";
import { Storage } from "../storage/Storage";

/**
 * Wraps another StateGenerator such that each new state gets written to storage.
 */
export class StoredStateGenerator<S extends State> extends StateGenerator<S> {
  public constructor(
    private readonly underlyingGenerator: StateGenerator<S>,
    private readonly storage: Storage<S>,
  ) {
    super();
  }

  public async apply(action: Action, prevState: S): Promise<S> {
    if (!isLoadStoredStateAction(action)) {
      // For most actions, just pass it along and make note of the result.
      const resultState = await this.underlyingGenerator.apply(
        action,
        prevState,
      );
      await this.storage.writeValue(resultState);
      return resultState;
    }

    // Loading is a special case, handled only at this level and bypassing the wrapped manager.
    return await this.storage.readValue();
  }
}

export type StoredStateGeneratorAction = LoadStoredStateAction;

export interface LoadStoredStateAction extends Action {
  type: "storage.load";
}
export function isLoadStoredStateAction(
  action: Action,
): action is LoadStoredStateAction {
  return action && action.type === "storage.load";
}
