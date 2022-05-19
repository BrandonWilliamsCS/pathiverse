import { BaseDependencyMap } from "../BaseDependencyMap";
import { DependencyRegistry } from "./DependencyRegistry";

export class CombinedDependencyRegistry<
  T = BaseDependencyMap,
> extends DependencyRegistry<T> {
  public constructor(
    public readonly childRegistries: DependencyRegistry<T>[],
  ) {
    super();
  }

  public resolveDependencyStatus<K extends keyof T>(
    key: K,
  ): { present: boolean; value?: T[K] } {
    for (const childRegistry of this.childRegistries) {
      const childStatus = childRegistry.resolveDependencyStatus(key);
      if (childStatus.present) {
        return childStatus;
      }
    }
    return { present: false };
  }
}
