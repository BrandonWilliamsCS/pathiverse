import { Action } from "./Action";
import { ContentIndicator } from "./Content";

/**
 * A descriptive overview of a single, discrete element of a Story within a World.
 */
export interface Scene {
  world: string;
  story: string;
  name: string;
  summary: string | undefined;
  branchSummary: string | undefined;
  contentIndicator: ContentIndicator;
  possibleActions: Action[];
}
