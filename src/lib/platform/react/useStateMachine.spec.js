import { renderHook, act } from "@testing-library/react-hooks";

import { StateGenerator } from "../../kernel/StateGenerator";
import { useStateMachine } from "./useStateMachine";

describe("useStateMachine", () => {
  it("presents an empty state, at first", () => {
    // Arrange
    const stateGenerator = new TestStateGenerator();
    const contentResolver = createTestContentResolver();

    // Act
    const { result } = renderHook(() =>
      useStateMachine(stateGenerator, contentResolver),
    );

    expect(result.current[0]).toBe(undefined);
  });

  it("presents the current state and content after initial action", async () => {
    // Arrange
    const stateGenerator = new TestStateGenerator();
    const contentResolver = createTestContentResolver();
    const initialAction = { type: "INITIAL" };

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useStateMachine(stateGenerator, contentResolver),
    );
    await act(async () => {
      const actionHandler = result.current[1];
      actionHandler(initialAction);
      await waitForNextUpdate();
    });

    expect(result.current[0]).toEqual([
      {
        currentScene: testScene,
        forAction: initialAction,
        prevState: undefined,
      },
      {
        type: "CONTENT_TYPE",
        indicator: { type: "CONTENT_TYPE" },
      },
    ]);
  });

  it("presents the current state and content after a second action", async () => {
    // Arrange
    const stateGenerator = new TestStateGenerator();
    const contentResolver = createTestContentResolver();
    const initialAction = { type: "INITIAL" };
    const secondaryAction = { type: "SECOND" };

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useStateMachine(stateGenerator, contentResolver),
    );
    await act(async () => {
      const actionHandler = result.current[1];
      actionHandler(initialAction);
      await waitForNextUpdate();
    });
    await act(async () => {
      const actionHandler = result.current[1];
      actionHandler(secondaryAction);
      await waitForNextUpdate();
    });

    expect(result.current[0]).toEqual([
      {
        currentScene: testScene,
        forAction: secondaryAction,
        prevState: {
          currentScene: testScene,
          forAction: initialAction,
          prevState: undefined,
        },
      },
      {
        type: "CONTENT_TYPE",
        indicator: { type: "CONTENT_TYPE" },
      },
    ]);
  });
});

const testScene = {
  world: "WORLD",
  story: "STORY",
  name: "SCENE",
  summary: "SUMMARY",
  branchSummary: "BRANCH_SUMMARY",
  contentIndicator: { type: "CONTENT_TYPE" },
  possibleActions: [{ type: "ACTION_TYPE" }],
};

class TestStateGenerator extends StateGenerator {
  apply(action, prevState) {
    return Promise.resolve({
      currentScene: testScene,
      forAction: action,
      prevState,
    });
  }
}

function createTestContentResolver() {
  return (indicator) => ({
    type: indicator.type,
    indicator,
  });
}
