/**
 * Reflects the status of an async operation at a point in time.
 * A single promise may have resolved (to a value if not void), rejected, or
 * the result may still be pending. However, when considering that one promise
 * may be replacing or updating the value from another, it's useful to maintain
 * the "last good value" even when the current promise is still pending or has
 * rejected. Thus, a single status may be pending, in error, or neither; in any
 * of those cases, it may also record the value of a prior succesful resolution.
 *
 * @remarks
 *
 * Note that this type definition utilizes a feature of TypeScript that allows
 * the presence or absence of a value or error to be established without
 * explicitly using undefined; if hasValue is true, there is a value field with
 * type T. If it is false, there *is no value field* - attempting to access it
 * is an error.
 */
export type AsyncStatus<T, E = any> = AsyncStatusValue<T> & AsyncStatusError<E>;

export type AsyncStatusValue<T> = Readonly<
  { hasValue: false } | { hasValue: true; value: T }
>;

export type AsyncStatusError<E> = Readonly<
  | { hasError: false; isPending: boolean }
  | { hasError: true; isPending: false; error: E }
>;

export const initialStatus: AsyncStatus<never> = Object.freeze({
  isPending: false,
  hasValue: false,
  hasError: false,
  source: new Promise<never>(() => {}),
});

export function process<T, E = any>(
  previousStatus?: AsyncStatus<T, E>,
): AsyncStatus<T, E> {
  return previousStatus?.hasValue
    ? {
        isPending: true,
        hasError: false,
        hasValue: true,
        value: previousStatus.value,
      }
    : {
        isPending: true,
        hasError: false,
        hasValue: false,
      };
}

export function succeed<T, E>(result: T): AsyncStatus<T, E> {
  return {
    hasValue: true,
    value: result,
    isPending: false,
    hasError: false,
  };
}

export function fail<T, E>(
  previous: AsyncStatus<T, E>,
  error: E,
): AsyncStatus<T, E> {
  let next: AsyncStatus<T, E> = {
    hasError: true,
    error,
    isPending: false,
    // First, assume no value.
    hasValue: false,
  };
  // Note the previous value if present.
  if (previous?.hasValue) {
    next = {
      ...next,
      hasValue: true,
      value: previous.value,
    };
  }
  return next;
}

export function mapAsyncStatus<T, U, E>(
  baseStatus: AsyncStatus<T, E>,
  mapper: (value: T) => U,
): AsyncStatus<U, E> {
  return baseStatus.hasValue
    ? {
        ...baseStatus,
        value: mapper(baseStatus.value),
      }
    : baseStatus;
}
