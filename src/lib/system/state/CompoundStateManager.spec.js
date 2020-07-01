import { StateManager } from "../../kernel/StateManager";
import { CompoundStateManager } from "./CompoundStateManager";

describe("CompoundStateManager", () => {
  describe("currentState", () => {
    it("throws when not initialized", () => {
      // Arrange
      const subStateManagerMap = {
        component1: new TestStateManager("component1"),
        component2: new TestStateManager("component2"),
      };
      const stateManager = new CompoundStateManager(subStateManagerMap);

      // Act
      const act = () => stateManager.currentState;

      // Assert
      expect(act).toThrow();
    });

    it("reflects the state generated from the last applied action", async () => {
      // Arrange
      const subStateManagerMap = {
        component1: new TestStateManager("component1"),
        component2: new TestStateManager("component2"),
      };
      const stateManager = new CompoundStateManager(subStateManagerMap);
      const action = { type: "ACTION" };

      // Act
      const expected = await stateManager.apply(action);
      const result = stateManager.currentState;

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe("apply", () => {
    it("combines the result of its constituent StateManagers' `apply` calls", async () => {
      // Arrange
      const subStateManagerMap = {
        component1: new TestStateManager("component1"),
        component2: new TestStateManager("component2"),
      };
      const stateManager = new CompoundStateManager(subStateManagerMap);
      const action = { type: "ACTION" };

      // Act
      const result = await stateManager.apply(action);

      // Assert
      expect(result).toMatchObject({
        component1: {
          identifier: "component1",
          forAction: action,
        },
        component2: {
          identifier: "component2",
          forAction: action,
        },
      });
    });
  });
});

class TestStateManager extends StateManager {
  constructor(identifier) {
    super();
    this.identifier = identifier;
    this.initialState = { identifier: this.identifier, forAction: undefined };
  }
  generateNewState(action) {
    return Promise.resolve({ identifier: this.identifier, forAction: action });
  }
}
