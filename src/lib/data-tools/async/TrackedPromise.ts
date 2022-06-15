import { Observable, Subject } from "rxjs";
import { AsyncStatus } from "./AsyncStatus";
import { trackPromise } from "./index";

export class TrackedPromise<T, E = any> implements Promise<T> {
  private latestStatus: AsyncStatus<T, E>;
  private readonly statusSubject = new Subject<AsyncStatus<T, E>>();

  public get currentStatus(): AsyncStatus<T, E> {
    return this.latestStatus;
  }

  public get statusChanges(): Observable<AsyncStatus<T, E>> {
    return this.statusSubject;
  }

  public constructor(
    public readonly promise: Promise<T>,
    previousStatus?: AsyncStatus<T, E>,
  ) {
    this.latestStatus = trackPromise(
      promise,
      (nextStatus) => {
        this.latestStatus = nextStatus;
        this.statusSubject.next(nextStatus);
        if (!nextStatus.isPending) {
          this.statusSubject.complete();
        }
      },
      previousStatus,
    );
  }

  /********* Pass-through implementation of Promise interface **********/
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
  ): Promise<T | TResult> {
    return this.promise.catch(onrejected);
  }
  finally(onfinally?: (() => void) | null): Promise<T> {
    return this.promise.finally(onfinally);
  }
  get [Symbol.toStringTag]() {
    return "TrackedPromise";
  }
}
