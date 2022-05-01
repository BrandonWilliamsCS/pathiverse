import React from "react";

/**
 * Maintains a value reference by keeping it in a ref.
 * This is useful in combination with useStableValue when the stable value
 *  needs to access the volatile value, but not as a dependency.
 * @param value a volatile value to maintain
 * @returns an up-to-date ref surrounding the value
 */
export function useVolatileValue<T>(value: T): React.MutableRefObject<T> {
  const ref = React.useRef<T>(value);
  ref.current = value;
  return ref;
}
