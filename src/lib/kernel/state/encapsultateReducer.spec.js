import { encapsulateReducer } from "./encapsulateReducer";

describe("encapsulateReducer", () => {
  it("Returns the initial state in the first state capsule", async () => {
    // Arrange
    const reducer = (prevState, action) => prevState + action;

    // Act
    const [firstState] = encapsulateReducer(reducer, 0);

    // Assert
    expect(firstState).toBe(0);
  });

  it("Returns a reduced state in the state capsule produced by action application", async () => {
    // Arrange
    const reducer = (prevState, action) => prevState + action;

    // Act
    const [, firstApplier] = encapsulateReducer(reducer, 0);
    const [reducedState] = await firstApplier(1);

    // Assert
    expect(reducedState).toBe(1);
  });
});
