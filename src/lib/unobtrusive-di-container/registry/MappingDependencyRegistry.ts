import { BaseDependencyMap } from "../BaseDependencyMap";
import { DependencyEntry } from "../DependencyEntry";
import { RegistrationMap } from "../RegistrationMap";
import { DependencyRegistry } from "./DependencyRegistry";

/** Provides access to previously-registered dependencies as a registration map */
export class MappingDependencyRegistry<
  T = BaseDependencyMap,
> extends DependencyRegistry<T> {
  public static readonly Empty = new MappingDependencyRegistry<{}>({});

  private readonly entries = new Map<
    string | number | symbol,
    DependencyEntry<unknown, T>
  >();

  public constructor(private readonly registrations: RegistrationMap<T>) {
    super();
  }

  public override getEntry<K extends keyof T>(
    key: K,
  ): DependencyEntry<T[K], T> | undefined {
    if (!this.entries.has(key)) {
      const registration = this.registrations[key];
      if (!registration) {
        return undefined;
      }
      this.entries.set(key, new DependencyEntry<T[K], T>(key, registration));
    }
    return this.entries.get(key) as DependencyEntry<T[K], T> | undefined;
  }
}
