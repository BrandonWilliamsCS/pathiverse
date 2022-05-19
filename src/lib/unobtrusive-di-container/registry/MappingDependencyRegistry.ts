import { BaseDependencyMap } from "../BaseDependencyMap";
import { RegistrationMap } from "../RegistrationMap";
import { DependencyRegistry } from "./DependencyRegistry";

/** Provides access to previously-registered dependencies as a registration map */
export class MappingDependencyRegistry<
  T = BaseDependencyMap,
> extends DependencyRegistry<T> {
  public static readonly Empty = new MappingDependencyRegistry<{}>({});

  private readonly resolvedDependencies = new Map<
    string | number | symbol,
    unknown
  >();

  public constructor(private readonly registrations: RegistrationMap<T>) {
    super();
  }

  public resolveDependencyStatus<K extends keyof T>(
    key: K,
  ): { present: boolean; value?: T[K] } {
    // If we've cached the value, use that.
    if (this.resolvedDependencies.has(key)) {
      return {
        present: true,
        value: this.resolvedDependencies.get(key) as T[K],
      };
    }

    // Or, if we have it registered, utilize the registration.
    const registration = this.registrations[key];
    if (registration) {
      return this.resolveRegisteredDependencyStatus(key, registration);
    }

    // Otherwise, we can't provide the depenendency.
    return { present: false };
  }

  private resolveRegisteredDependencyStatus<K extends keyof T>(
    key: K,
    registration: RegistrationMap<T>[K],
  ): { present: true; value: T[K] } {
    const value =
      registration.type === "instance"
        ? registration.instance
        : registration.factory(this);
    if (registration.type !== "factory" || !registration.transient) {
      this.resolvedDependencies.set(key, value);
    }
    return {
      present: true,
      value: this.resolvedDependencies.get(key) as T[K],
    };
  }
}
