/**
 *  Generally, a dependency map associates each dependency's key to its type.
 *  BaseDependencyMap is a default, wide-open dependency map for default usage.
 */
export type BaseDependencyMap = Record<string | number | symbol, unknown>;
