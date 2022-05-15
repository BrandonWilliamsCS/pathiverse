import { BaseDependencyMap } from "./BaseDependencyMap";
import { DependencyFactory } from "./DependencyFactory";
import { DependencyRegistar } from "./DependencyRegistrar";
import { DependencyRegistry } from "./DependencyRegistry";
import { RegistrationMap } from "./RegistrationMap";

/** A DependencyRegistar that serves to build a Registry from its registrations */
export class DependencyRegistryBuilder<T = BaseDependencyMap>
  implements DependencyRegistar<T>
{
  private readonly registrationMap: RegistrationMap<T> =
    {} as RegistrationMap<T>;

  registerInstance<K extends keyof T>(key: K, instance: T[K]): void {
    this.registrationMap[key] = { type: "instance", instance };
  }

  registerFactory<K extends keyof T>(
    key: K,
    factory: DependencyFactory<T[K], T>,
    transient = false,
  ): void {
    this.registrationMap[key] = { type: "factory", factory, transient };
  }

  build(parentRegistry?: DependencyRegistry<T>): DependencyRegistry<T> {
    return new DependencyRegistry<T>(this.registrationMap, parentRegistry);
  }
}
