import { renderHook, act } from "@testing-library/react-hooks";

import { useFunctionInitRef } from "./useFunctionInitRef";

describe("useFunctionInitRef", () => {
  it("Returns the initializer's value on first call", () => {
    // Arrange
    const initializer = jest.fn().mockReturnValue("value");

    // Act
    const { result } = renderHook(() => useFunctionInitRef(initializer));

    // Assert
    const resultRef = result.current;
    expect(resultRef.current).toBe("value");
  });

  it("Only calls the initializer once", async () => {
    // Arrange
    const initializer = jest.fn().mockReturnValue("value");

    // Act
    const { rerender } = renderHook(() => useFunctionInitRef(initializer));
    rerender();

    // Assert
    expect(initializer).toHaveBeenCalledTimes(1);
  });
});
