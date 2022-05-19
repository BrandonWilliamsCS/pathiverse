import React from "react";

import { BaseDependencyMap } from "./BaseDependencyMap";
import { DependencyRegistrar } from "./DependencyRegistrar";
import { DependencyRegistryBuilder } from "./DependencyRegistryBuilder";
import { CombinedDependencyRegistry } from "./registry/CombinedDependencyRegistry";
import { DependencyRegistry } from "./registry/DependencyRegistry";
import { MappingDependencyRegistry } from "./registry/MappingDependencyRegistry";

// Don't export this - it should only be consumed through the component and hook.
const InternalContext = React.createContext<DependencyRegistry<any>>(
  MappingDependencyRegistry.Empty,
);

export interface DependencyProviderProps<T> {
  registerDependencies: (registrar: DependencyRegistrar<T>) => void;
}

export function DependencyProvider<T = BaseDependencyMap>({
  children,
  registerDependencies,
}: React.PropsWithChildren<DependencyProviderProps<T>>) {
  const registryRef = React.useRef<DependencyRegistry<T>>();
  if (registryRef.current === undefined) {
    const registryBuilder = new DependencyRegistryBuilder<T>();
    registerDependencies(registryBuilder);
    registryRef.current = registryBuilder.build();
  }
  return (
    <DirectDependencyProvider registry={registryRef.current!}>
      {children}
    </DirectDependencyProvider>
  );
}

export interface DirectDependencyProviderProps<T> {
  registry: DependencyRegistry<T>;
}

export function DirectDependencyProvider<T = BaseDependencyMap>({
  children,
  registry,
}: React.PropsWithChildren<DirectDependencyProviderProps<T>>) {
  const parentRegistry = React.useContext(
    InternalContext,
  ) as DependencyRegistry<T>;
  const registryRef = React.useRef<CombinedDependencyRegistry<T>>();
  if (
    registryRef.current?.childRegistries[0] !== registry ||
    registryRef.current?.childRegistries[1] !== parentRegistry
  ) {
    const combinedRegistry = new CombinedDependencyRegistry([
      registry,
      parentRegistry,
    ]);
    combinedRegistry.resolveDependency =
      combinedRegistry.resolveDependency.bind(combinedRegistry);
    combinedRegistry.resolveOptionalDependency =
      combinedRegistry.resolveOptionalDependency.bind(combinedRegistry);
    registryRef.current = combinedRegistry;
  }
  return (
    <InternalContext.Provider
      value={registryRef.current as DependencyRegistry<any>}
    >
      {children}
    </InternalContext.Provider>
  );
}

export function useDependencies<T = BaseDependencyMap>(): <
  K extends keyof T = keyof T,
>(
  key: K,
) => T[K] {
  const registry = React.useContext(InternalContext) as DependencyRegistry<T>;
  return registry.resolveDependency;
}

export function useDependency<
  T = BaseDependencyMap,
  K extends keyof T = keyof T,
>(key: K): T[K] {
  const registry = React.useContext(InternalContext) as DependencyRegistry<T>;
  return registry.resolveDependency(key);
}
