import { BaseDependencyMap } from "./BaseDependencyMap";
import { RegistrationMap } from "./RegistrationMap";

/** Provides access to previously-registered dependencies */
export class DependencyRegistry<T = BaseDependencyMap> {
  public static readonly Empty = new DependencyRegistry<{}>({});

  private readonly resolvedDependencies = new Map<
    string | number | symbol,
    unknown
  >();

  public constructor(
    private readonly registrations: RegistrationMap<T>,
    private readonly parentRegistry?: DependencyRegistry<T>,
  ) {
    this.resolveDependency = this.resolveDependency.bind(this);
    this.resolveOptionalDependency = this.resolveOptionalDependency.bind(this);
  }

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

  private resolveDependencyStatus<K extends keyof T>(
    key: K,
  ): { present: boolean; value?: T[K] } {
    // If we've cached the value, use that.
    if (this.resolvedDependencies.has(key)) {
      return {
        present: true,
        value: this.resolvedDependencies.get(key) as T[K],
      };
    }

    // Or, if we have it registered, utilized the registration.
    const registration = this.registrations[key];
    if (registration) {
      return this.resolveRegisteredDependencyStatus(key, registration);
    }

    // finally, defer to a parent scope if present or simply fail.
    return this.parentRegistry
      ? this.parentRegistry.resolveDependencyStatus(key)
      : { present: false };
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
