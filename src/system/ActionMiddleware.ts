import { Action } from "kernel/Action";
import { ActionApplier } from "kernel/state/ActionApplier";
import { StateCapsule } from "kernel/state/StateCapsule";

export type ActionMiddleware<S> = (
  action: Action,
  next: ActionApplier<S>,
) => Promise<StateCapsule<S>>;
