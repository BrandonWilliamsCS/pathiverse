import { keys, mapValues, values, zipObject } from "lodash";

import { Action } from "../../Action";
import { State } from "../../State";
import { StateGenerator } from "../../kernel/StateGenerator";

/**
 * Combines multiple constituent StateGenerators by assigning each to one key in an object.
 */
export class CompoundStateGenerator<S extends State> extends StateGenerator<S> {
  public constructor(
    private readonly substateGeneratorMap: SubStateGeneratorMap<S>,
  ) {
    super();
  }

  public async apply(action: Action, prevState: S | undefined): Promise<S> {
    // Apply the state for each StateGenerator...
    const substatePromises = mapValues(
      this.substateGeneratorMap,
      (substateGenerator, key) => {
        const prevSubstate = prevState && prevState[key];
        return substateGenerator.apply(action, prevSubstate);
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
export type SubStateGeneratorMap<S extends State> = {
  [NonSceneKey in keyof S]: StateGenerator<S[NonSceneKey]>;
};
