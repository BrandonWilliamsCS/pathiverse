import { ResourceIndicator } from "./ResourceIndicator";

/** Something able to access a resource by its indicator. */
export interface ResourceReader<T> {
  getResource(indicator: ResourceIndicator): Promise<T>;
}
