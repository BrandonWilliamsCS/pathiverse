/** Contains instruction for accessing some kind of external resource */
export interface ResourceIndicator {
  type: string;
  requiresContext?: boolean;
  value: string;
}
