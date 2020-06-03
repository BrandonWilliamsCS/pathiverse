import { Action } from "./Action";
import { ContentIndicator } from "./Content";

export interface Scene<AType extends string, CType extends string> {
  world: string;
  story: string;
  name: string;
  summary: string | undefined;
  branchSummary: string | undefined;
  contentIndicator: ContentIndicator<CType>;
  possibleActions: Array<Action<AType>>;
}
