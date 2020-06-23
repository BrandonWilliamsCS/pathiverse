import { State } from "../State";

export type CoreAction = OverwriteAction;

export interface OverwriteAction {
  type: "core.overwrite";
  // This would be nice to type more strongly, but then it'd have to be passed everywhere.
  toState: State;
}
