/**
 * Generically represents that may succeed with a value or fail with an error.
 * @remarks
 * Useful for separating "known errors", which are not truly exceptional, from
 * exception handling mechanisms such as promise rejection or `throw`/`catch`.
 * That is, throw if something broke, or return a failed `Outcome` if failure is
 * a perfectly valid result that might need to be handled in detail.
 * For example, a server error that leads to a 500 code is an exceptional
 * result; not much can be done except to terminate the attempt. On the other
 * hand, "that username is taken" requires special attention to inform the user
 * of the details.
 */
export type Outcome<T, E> =
  | {
      success: true;
      value: T;
    }
  | {
      success: false;
      error: E;
    };
