import { BaseDependencyMap } from "../BaseDependencyMap";

/** Provides access to previously-registered dependencies */
export abstract class DependencyRegistry<T = BaseDependencyMap> {
  public resolveDependency<K extends keyof T>(key: K): T[K] {
    const dependency = this.resolveDependencyStatus(key);
    if (!dependency.present) {
      throw new Error(`Missing dependency with key ${key}`);
    }
    return dependency.value!;
  }

  public resolveOptionalDependency<K extends keyof T>(
    key: K,
  ): T[K] | undefined {
    return this.resolveDependencyStatus(key).value;
  }

  abstract resolveDependencyStatus<K extends keyof T>(
    key: K,
  ): { present: boolean; value?: T[K] };
}
