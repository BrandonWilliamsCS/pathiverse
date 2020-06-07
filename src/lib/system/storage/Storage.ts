export interface Storage<T> {
  readValue(): Promise<T>;
  writeValue(value: T): Promise<void>;
}
