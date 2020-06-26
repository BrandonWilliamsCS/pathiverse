import { keys, mapValues, values, zipObject } from "lodash";

import { Action } from "../../Action";
import { State } from "../../State";
import { StateManager } from "../../kernel/StateManager";

/**
 * Combines multiple constituent StateManagers by assigning each to one key in an object.
 */
export class CompoundStateManager<S extends State> extends StateManager<S> {
  // Just assemble the state from all of the constituent StateManagers.
  protected readonly initialState = mapValues(
    this.substateManagerMap,
    (substateManager) => {
      return substateManager.currentState;
      // mapValues can't really keep track of the types, so we have to assert.
    },
  ) as S;

  public constructor(
    private readonly substateManagerMap: SubStateManagerMap<S>,
  ) {
    super();
  }

  protected async generateNewState(action: Action): Promise<S> {
    // Apply the state for each StateManager...
    const substatePromises = mapValues(
      this.substateManagerMap,
      (substateManager) => {
        return substateManager.apply(action);
      },
    );
    // ...which involves some fancy awaiting.
    return zipObject(
      keys(substatePromises),
      await Promise.all<any>(values(substatePromises)),
      // zipObject can't really keep track of the types, so we have to assert.
    ) as S;
  }
}

// Take an object type with keys and wrap the value types in StatMaanger.
export type SubStateManagerMap<S extends State> = {
  [NonSceneKey in keyof S]: StateManager<S[NonSceneKey]>;
};
