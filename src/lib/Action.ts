/**
 * Describes some sort of force or influence upon the system's state.
 */
export interface Action<AType extends string> {
  type: AType;
}
