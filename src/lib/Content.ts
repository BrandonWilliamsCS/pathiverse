/**
 * A unit of (usually) interactive media that can be presented to a user/player, such as a script.
 */
export interface Content<CType extends string> {
  type: CType;
}

/**
 * Data needed for resolving content of the given type.
 */
export interface ContentIndicator<CType extends string> {
  type: CType;
  name: string;
}
