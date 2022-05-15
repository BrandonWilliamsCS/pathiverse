import { BaseDependencyMap } from "./BaseDependencyMap";
import { DependencyFactory } from "./DependencyFactory";

/** The details of registration for a single dependency */
export type DependencyRegistration<T, TMap = BaseDependencyMap> =
  | InstanceDependencyRegistration<T>
  | FactoryDependencyRegistration<T, TMap>;

/** The details of registration for a single dependency registered as an instance */
export interface InstanceDependencyRegistration<T> {
  type: "instance";
  instance: T;
}

/** The details of registration for a single dependency registered by factory */
export interface FactoryDependencyRegistration<T, TMap> {
  type: "factory";
  transient: boolean;
  factory: DependencyFactory<T, TMap>;
}
