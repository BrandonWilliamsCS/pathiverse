/**
 * A unit of (usually) interactive media that can be presented to a user/player, such as a script.
 */
export interface Content {
  readonly type: string;
}

/**
 * Data needed for resolving content of the given type.
 */
export interface ContentIndicator {
  readonly type: string;
  name: string;
}
