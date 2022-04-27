/**
 * Represents some read- and/or writable data source for a single value.
 * For example, a single file or REST API entity.
 */
export interface Storage<T> {
  readValue(): Promise<T>;
  writeValue(value: T): Promise<void>;
}
