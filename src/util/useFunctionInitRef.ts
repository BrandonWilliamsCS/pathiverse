import React from "react";

/**
 * Wraps React.useRef such that it can be called with an init function rather than a single value.
 * @param initialize Generates the initial ref value upon first and only call.
 */
export function useFunctionInitRef<T>(
  initialize: () => T,
): React.MutableRefObject<T> {
  const initializedRef = React.useRef(false);
  const valueRef = React.useRef<T>(undefined as any);
  if (!initializedRef.current) {
    initializedRef.current = true;
    valueRef.current = initialize();
  }
  return valueRef;
}
