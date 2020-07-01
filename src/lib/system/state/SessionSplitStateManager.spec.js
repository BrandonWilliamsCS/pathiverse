import { StateManager } from "../../kernel/StateManager";
import { SessionSplitStateManager } from "./SessionSplitStateManager";

describe("SessionSplitStateManager", () => {
  describe("currentState", () => {
    it("throws when not initialized", () => {
      // Arrange
      const sessionStateManager = new TestStateManager("session");
      const worldStateManager = new TestStateManager("world");
      const stateManager = new SessionSplitStateManager(
        sessionStateManager,
        worldStateManager,
      );

      // Act
      const act = () => stateManager.currentState;

      // Assert
      expect(act).toThrow();
    });

    it("reflects the state generated from the last applied action", async () => {
      // Arrange
      const sessionStateManager = new TestStateManager("session");
      const worldStateManager = new TestStateManager("world");
      const stateManager = new SessionSplitStateManager(
        sessionStateManager,
        worldStateManager,
      );
      const action = { type: "ACTION" };

      // Act
      const expected = await stateManager.apply(action);
      const result = stateManager.currentState;

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe("apply", () => {
    it("returns the result of its constituent StateManagers' `apply` calls, joined", async () => {
      // Arrange
      const sessionStateManager = new TestStateManager("session");
      const worldStateManager = new TestStateManager("world");
      const stateManager = new SessionSplitStateManager(
        sessionStateManager,
        worldStateManager,
      );
      const action = { type: "ACTION" };

      // Act
      const result = await stateManager.apply(action);

      // Assert
      expect(result).toMatchObject({
        session: "session",
        world: "world",
        forAction: action,
      });
    });
  });
});

class TestStateManager extends StateManager {
  constructor(identifier) {
    super();
    this.identifier = identifier;
    this.initialState = {
      [this.identifier]: this.identifier,
      both: this.identifier,
      forAction: undefined,
    };
  }
  apply(action) {
    return Promise.resolve({
      [this.identifier]: this.identifier,
      both: this.identifier,
      forAction: action,
    });
  }
}
