import { Action } from "../kernel/Action";

export type ActionTransformer = (action: Action) => Promise<Action>;

export function combineActionTransformers(
  transformers: ActionTransformer[],
): ActionTransformer {
  return async (initialAction) => {
    let action = initialAction;
    for (const transformer of transformers) {
      action = await transformer(action);
    }
    return action;
  };
}
