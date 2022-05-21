import { BaseDependencyMap } from "./BaseDependencyMap";
import { DependencyFactory } from "./DependencyFactory";
import { DependencyRegistrar } from "./DependencyRegistrar";
import { RegistrationMap } from "./RegistrationMap";
import { DependencyRegistry } from "./registry/DependencyRegistry";
import { MappingDependencyRegistry } from "./registry/MappingDependencyRegistry";

/** A DependencyRegistrar that serves to build a Registry from its registrations */
export class DependencyRegistryBuilder<T = BaseDependencyMap>
  implements DependencyRegistrar<T>
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

  build(): DependencyRegistry<T> {
    return new MappingDependencyRegistry<T>(this.registrationMap);
  }
}
