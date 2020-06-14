import { keys, mapValues, values, zipObject } from "lodash";

import { Action } from "../../Action";
import { State } from "../../State";
import { StateManager } from "../../kernel/StateManager";

/**
 * Combines multiple constituent StateManagers by assigning each to one key in an object.
 */
export class CompoundStateManager<
  AType extends string,
  S extends State
> extends StateManager<AType, S> {
  public constructor(
    private readonly substateManagerMap: SubStateManagerMap<AType, S>,
  ) {
    super();
  }

  public get currentState(): S {
    // Just assemble the state from all of the constituent StateManagers.
    return mapValues(this.substateManagerMap, (substateManager) => {
      return substateManager.currentState;
      // mapValues can't really keep track of the types, so we have to assert.
    }) as S;
  }

  public async apply(action: Action<AType>): Promise<S> {
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
export type SubStateManagerMap<AType extends string, S extends State> = {
  [NonSceneKey in keyof S]: StateManager<AType, S[NonSceneKey]>;
};