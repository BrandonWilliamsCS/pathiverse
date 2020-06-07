import { StateManager } from "../../kernel/StateManager";
import { CompoundStateManager } from "./CompoundStateManager";

describe("CompoundStateManager", () => {
  describe("currentState", () => {
    it("initially combines its constituent StateManagers' initial state", () => {
      // Arrange
      const subStateManagerMap = {
        component1: new TestStateManager("component1"),
        component2: new TestStateManager("component2"),
      };
      const stateManager = new CompoundStateManager(subStateManagerMap);

      // Act
      const result = stateManager.currentState;

      // Assert
      expect(result).toMatchObject({
        component1: {
          identifier: "component1",
          forAction: undefined,
        },
        component2: {
          identifier: "component2",
          forAction: undefined,
        },
      });
    });

    it("combines its constituent StateManagers' post-action state after applying an action", async () => {
      // Arrange
      const subStateManagerMap = {
        component1: new TestStateManager("component1"),
        component2: new TestStateManager("component2"),
      };
      const stateManager = new CompoundStateManager(subStateManagerMap);
      const action = { type: "ACTION" };

      // Act
      await stateManager.apply(action);
      const result = stateManager.currentState;

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
    this.currentState = { identifier: this.identifier, forAction: undefined };
  }
  apply(action) {
    this.currentState = { identifier: this.identifier, forAction: action };
    return Promise.resolve(this.currentState);
  }
}
