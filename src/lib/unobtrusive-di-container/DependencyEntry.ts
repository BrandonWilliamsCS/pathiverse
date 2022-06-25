import { BaseDependencyMap } from "./BaseDependencyMap";
import { DependencyRegistration } from "./DependencyRegistration";
import { DependencyRegistry } from "./registry/DependencyRegistry";

export class DependencyEntry<T, TMap = BaseDependencyMap> {
  private valueResolved = false;
  private resolvedValue: T | undefined;

  public constructor(
    public readonly key: string | number | symbol,
    public readonly registration: DependencyRegistration<T, TMap>,
  ) {}

  public getValue(registry: DependencyRegistry<TMap>): T {
    if (this.valueResolved) {
      return this.resolvedValue!;
    }

    const value =
      this.registration.type === "instance"
        ? this.registration.instance
        : this.registration.factory(registry);
    if (this.registration.type !== "factory" || !this.registration.transient) {
      this.resolvedValue = value;
      this.valueResolved = true;
    }

    return value;
  }
}
