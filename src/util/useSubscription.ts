import React from "react";
import { Observable, Observer } from "rxjs";

import { useVolatileValue } from "./useVolatileValue";

export function useSubscription<T>(
  observable: Observable<T> | undefined,
  observer: Partial<Observer<T>> | ((value: T) => void),
): void;
export function useSubscription<T, R = T>(
  observable: Observable<T> | undefined,
  observer: Partial<Observer<R>> | ((value: R) => void),
  piper: (base: Observable<T>) => Observable<R>,
): void;
export function useSubscription<T, R = T>(
  observable: Observable<T> | undefined,
  observer: Partial<Observer<R>> | ((value: R) => void),
  piper?: (base: Observable<T>) => Observable<R>,
): void {
  const consumerRef = useVolatileValue({ observer, piper });
  // useLayoutEffect means we subscribe immediately after render, rather than
  // in a new "frame". Otherwise we could miss emissions.
  // Note that this means emissions IN render will not be caught.
  React.useLayoutEffect(() => {
    if (!observable) {
      return;
    }
    const { piper } = consumerRef.current;
    const pipedObservable = piper
      ? piper(observable)
      : // If piper isn't specified, we know T=R anyway.
        (observable as unknown as Observable<R>);
    const unsubscribable = pipedObservable.subscribe((value) => {
      const normalizedObserver = normalizeObserver(
        consumerRef.current.observer,
      );
      normalizedObserver.next?.(value);
    });
    return unsubscribable.unsubscribe.bind(unsubscribable);
  }, [observable, consumerRef]);
}

function normalizeObserver<T>(
  observer: Partial<Observer<T>> | ((value: T) => void),
): Partial<Observer<T>> {
  return typeof observer === "function" ? { next: observer } : observer;
}
