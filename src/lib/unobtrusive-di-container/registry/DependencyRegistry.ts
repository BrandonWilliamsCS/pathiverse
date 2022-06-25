import { BaseDependencyMap } from "../BaseDependencyMap";
import { DependencyEntry } from "../DependencyEntry";

/** Provides access to previously-registered dependencies */
export abstract class DependencyRegistry<T = BaseDependencyMap> {
  public resolveDependency<K extends keyof T>(key: K): T[K] {
    const dependencyEntry = this.getEntry(key);
    if (!dependencyEntry) {
      throw new Error(`Missing dependency with key ${key.toString()}`);
    }
    return dependencyEntry.getValue(this);
  }

  public resolveOptionalDependency<K extends keyof T>(
    key: K,
  ): T[K] | undefined {
    return this.getEntry(key)?.getValue(this);
  }

  public abstract getEntry<K extends keyof T>(
    key: K,
  ): DependencyEntry<T[K], T> | undefined;
}
