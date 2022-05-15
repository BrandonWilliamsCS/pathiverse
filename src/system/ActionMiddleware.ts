import { Action } from "kernel/Action";
import { ActionApplier } from "kernel/state/ActionApplier";
import { StateCapsule } from "kernel/state/StateCapsule";

export type ActionMiddleware<S> = (
  action: Action,
  next: ActionApplier<S>,
) => Promise<StateCapsule<S>>;

export function combineActionMiddleware<S>(
  pieces: ActionMiddleware<S>[],
): ActionMiddleware<S> {
  return pieces.reduceRight(
    (acc, incoming) => (action, next) => incoming(action, (a) => acc(a, next)),
  );
}
