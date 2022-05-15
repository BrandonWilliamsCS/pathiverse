import { BaseDependencyMap } from "./BaseDependencyMap";
import { DependencyFactory } from "./DependencyFactory";

/** Enables registration of dependencies as static instances or through factories. */
export interface DependencyRegistar<T = BaseDependencyMap> {
  registerInstance<K extends keyof T>(key: K, instance: T[K]): void;
  registerFactory<K extends keyof T>(
    key: K,
    factory: DependencyFactory<T[K], T>,
    isTransient?: boolean,
  ): void;
}
