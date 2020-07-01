import { StateMachine } from "./StateMachine";
import { StateManager } from "./StateManager";

describe("StateMachine", () => {
  it("renders nothing until the initialization action is resolved", async () => {
    // Arrange
    const renderer = jest.fn();
    const stateManager = new TestStateManager();
    const stateMachine = new StateMachine(
      stateManager,
      testContentResolver,
      renderer,
    );

    // Act
    // give async operations time to finish
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

    // Assert
    expect(renderer).not.toHaveBeenCalled();
  });

  it("renders initial state when the initialization action is resolved", async () => {
    // Arrange
    const initialAction = { type: "ACTION" };
    const renderer = jest.fn();
    const stateManager = new TestStateManager();
    const stateMachine = new StateMachine(
      stateManager,
      testContentResolver,
      renderer,
    );

    // Act
    stateMachine.start(initialAction);
    // give async operations time to finish
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

    // Assert
    expect(renderer).toHaveBeenCalledWith(
      { currentScene: testScene, forAction: initialAction },
      {
        type: "CONTENT_TYPE",
        indicator: { type: "CONTENT_TYPE" },
      },
      expect.any(Function),
    );
  });

  it("renders next state when a second action is resolved", async () => {
    // Arrange
    const initialAction = { type: "ACTION" };
    const secondAction = { type: "ACTION2" };
    const renderer = jest.fn();
    const stateManager = new TestStateManager();
    const stateMachine = new StateMachine(
      stateManager,
      testContentResolver,
      renderer,
    );

    // Act
    stateMachine.start(initialAction);
    // give async operations time to finish
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    const actionHandler = renderer.mock.calls[0][2];
    actionHandler(secondAction);
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

    // Assert
    expect(renderer).toHaveBeenCalledWith(
      { currentScene: testScene, forAction: secondAction },
      {
        type: "CONTENT_TYPE",
        indicator: { type: "CONTENT_TYPE" },
      },
      expect.any(Function),
    );
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

class TestStateManager extends StateManager {
  initialState = { currentScene: testScene, forAction: undefined };
  generateNewState(action) {
    return Promise.resolve({ currentScene: testScene, forAction: action });
  }
}

function testContentResolver(indicator) {
  return {
    type: indicator.type,
    indicator: indicator,
  };
}
