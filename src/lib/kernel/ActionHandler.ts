import { Action } from "../Action";

export interface ActionHandler<AType extends string> {
  canHandle(actionType: string): actionType is AType;
  handle(action: Action<AType>): void;
}
