import { Observable } from "rxjs";
import { AsyncStatus } from "./AsyncStatus";
import { BaseAsyncValueModel } from "./BaseAsyncValueModel";

export interface AsyncValueModel<T, E = any> {
  get currentStatus(): AsyncStatus<T>;
  get statusChanges(): Observable<AsyncStatus<T>>;
  reload(): Promise<T>;
  signalDemand(): void;
  promiseNewestValue(): Promise<T>;
  map<U>(mapper: (value: T) => U): AsyncValueModel<U, E>;
}

export function createValueModel<T, E = any>(
  getValue: () => Promise<T>,
  waitForDemand = false,
) {
  const valueModel = new BaseAsyncValueModel<T, E>(getValue);
  if (!waitForDemand) {
    valueModel.signalDemand();
  }
  return valueModel;
}
