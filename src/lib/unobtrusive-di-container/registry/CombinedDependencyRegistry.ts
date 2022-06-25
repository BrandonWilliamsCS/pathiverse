import { BaseDependencyMap } from "../BaseDependencyMap";
import { DependencyEntry } from "../DependencyEntry";
import { DependencyRegistry } from "./DependencyRegistry";

export class CombinedDependencyRegistry<
  T = BaseDependencyMap,
> extends DependencyRegistry<T> {
  public constructor(public readonly childRegistries: DependencyRegistry<T>[]) {
    super();
  }

  public override getEntry<K extends keyof T>(
    key: K,
  ): DependencyEntry<T[K], T> | undefined {
    for (const childRegistry of this.childRegistries) {
      const childEntry = childRegistry.getEntry(key);
      if (childEntry) {
        return childEntry;
      }
    }
    return undefined;
  }
}
