import { map, Observable } from "rxjs";
import { AsyncStatus, mapAsyncStatus } from "./AsyncStatus";
import { AsyncValueModel } from "./index";

export class MappedAsyncValueModel<T, U, E = any>
  implements AsyncValueModel<T, E>
{
  public get currentStatus(): AsyncStatus<T> {
    return mapAsyncStatus(this.baseModel.currentStatus, this.mapper);
  }

  public get statusChanges(): Observable<AsyncStatus<T>> {
    return this.baseModel.statusChanges.pipe(
      map((status) => mapAsyncStatus(status, this.mapper)),
    );
  }

  constructor(
    private readonly baseModel: AsyncValueModel<U, E>,
    private readonly mapper: (value: U) => T,
  ) {
    // Make `reload` easy to use as a standalone function.
    this.reload = this.reload.bind(this);
  }

  public reload(): Promise<T> {
    return this.baseModel.reload().then(this.mapper);
  }

  public signalDemand(): void {
    this.baseModel.signalDemand();
  }

  public promiseNewestValue(): Promise<T> {
    return this.baseModel.promiseNewestValue().then(this.mapper);
  }

  public map<V>(mapper: (value: T) => V): AsyncValueModel<V, E> {
    return new MappedAsyncValueModel<V, T, E>(this, mapper);
  }
}
