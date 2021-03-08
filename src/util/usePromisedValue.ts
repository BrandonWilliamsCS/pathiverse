import React from "react";

export function usePromisedValue<T>(promise: Promise<T>): PromisedValue<T> {
  const [value, setValue] = React.useState<PromisedValue<T>>({
    resolved: false,
  });
  React.useEffect(() => {
    promise.then((value) => {
      setValue({ resolved: true, value });
    });
  }, [promise]);
  return value;
}

export type PromisedValue<T> =
  | { resolved: false }
  | { resolved: true; value: T };
