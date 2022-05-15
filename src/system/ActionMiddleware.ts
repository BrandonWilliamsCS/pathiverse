import { Action } from "kernel/Action";
import { StateCapsule } from "kernel/state/StateCapsule";

export type ActionMiddleware<S> = (
  action: Action,
  next: (action: Action) => Promise<StateCapsule<S>>,
) => Promise<StateCapsule<S>>;

export function combineActionMiddleware<S>(
  pieces: ActionMiddleware<S>[],
): ActionMiddleware<S> {
  return pieces.reduceRight(
    (acc, incoming) => (action, next) => incoming(action, (a) => acc(a, next)),
  );
}
