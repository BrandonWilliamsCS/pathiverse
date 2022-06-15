import { Observable, Subject } from "rxjs";
import { AsyncStatus, initialStatus } from "./AsyncStatus";
import { AsyncValueModel, trackPromise } from "./index";
import { MappedAsyncValueModel } from "./MappedAsyncValueModel";

export class BaseAsyncValueModel<T, E = any> implements AsyncValueModel<T, E> {
  private latestStatus: AsyncStatus<T> = initialStatus;
  private latestPromise: Promise<T> | undefined;
  private readonly statusSubject = new Subject<AsyncStatus<T, E>>();

  public get currentStatus(): AsyncStatus<T> {
    return this.latestStatus;
  }

  public get statusChanges(): Observable<AsyncStatus<T>> {
    return this.statusSubject;
  }

  constructor(private readonly getValue: () => Promise<T>) {
    // Make `reload` easy to use as a standalone function.
    this.reload = this.reload.bind(this);
  }

  public reload(): Promise<T> {
    const promise = this.getValue();
    this.latestPromise = promise;
    this.latestStatus = trackPromise(
      promise,
      (nextStatus) => {
        // Ignore activity from previous promises
        if (this.latestPromise !== promise) {
          return;
        }
        this.latestStatus = nextStatus;
        this.statusSubject.next(nextStatus);
      },
      this.latestStatus,
    );
    return promise;
  }

  public signalDemand(): void {
    if (this.currentStatus === initialStatus) {
      this.reload();
    }
  }

  public async promiseNewestValue(): Promise<T> {
    this.signalDemand();
    try {
      return await this.latestPromise!;
    } catch (ex) {
      if (this.currentStatus.hasValue) {
        return this.currentStatus.value;
      }
      throw ex;
    }
  }

  public map<U>(mapper: (value: T) => U): AsyncValueModel<U, E> {
    return new MappedAsyncValueModel<U, T, E>(this, mapper);
  }
}
