import React from "react";
import { Observable } from "rxjs";

import { useSubscription } from "./useSubscription";

export function useSubscribableValue<T>(
  subscribable: Observable<T> | undefined,
): T | undefined;
export function useSubscribableValue<T>(
  subscribable: Observable<T> | undefined,
  initialValue: T,
): T;
export function useSubscribableValue<T>(
  subscribable: Observable<T> | undefined,
  initialValue?: T,
): T | undefined {
  // Note: if initial value is provided, we can safely ignore `| undefined`
  //  as the value will always be a `T`.
  const [value, setValue] = React.useState<T | undefined>(initialValue);
  useSubscription(subscribable, setValue);
  return value;
}
