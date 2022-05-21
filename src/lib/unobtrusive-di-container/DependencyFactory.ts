import { DependencyRegistry } from "./registry/DependencyRegistry";

/** Generates a dependency given access to a registry for resolving sub-dependencies. */
export type DependencyFactory<T, TMap> = (
  registry: DependencyRegistry<TMap>,
) => T;
