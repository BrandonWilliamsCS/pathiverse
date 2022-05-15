import React from "react";

import { BaseDependencyMap } from "./BaseDependencyMap";
import { DependencyRegistar } from "./DependencyRegistrar";
import { DependencyRegistry } from "./DependencyRegistry";
import { DependencyRegistryBuilder } from "./DependencyRegistryBuilder";

// Don't export this - it should only be consumed through the component and hook.
const InternalContext = React.createContext(DependencyRegistry.Empty);

export interface DependencyProviderProps<T> {
  registerDependencies: (registrar: DependencyRegistar<T>) => void;
}

export function DependencyProvider<T = BaseDependencyMap>({
  children,
  registerDependencies,
}: React.PropsWithChildren<DependencyProviderProps<T>>) {
  const parentRegistry = React.useContext(
    InternalContext,
  ) as DependencyRegistry<T>;
  const registryRef = React.useRef<DependencyRegistry<T>>();
  if (registryRef.current === undefined) {
    const registryBuilder = new DependencyRegistryBuilder<T>();
    registerDependencies(registryBuilder);
    registryRef.current = registryBuilder.build(parentRegistry);
  }
  return (
    <InternalContext.Provider value={registryRef.current!}>
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
  // No need to bind here; it's already bound in the constructor.
  return registry.resolveDependency;
}

export function useDependency<
  T = BaseDependencyMap,
  K extends keyof T = keyof T,
>(key: K): T[K] {
  const registry = React.useContext(InternalContext) as DependencyRegistry<T>;
  return registry.resolveDependency(key);
}
