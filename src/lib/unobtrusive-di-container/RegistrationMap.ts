import { DependencyRegistration } from "./DependencyRegistration";

/** Maps dependency keys to their registrations */
export type RegistrationMap<T> = {
  [K in keyof T]: DependencyRegistration<T[K], T>;
};
