import { StateManager } from "../../kernel/StateManager";
import { SessionSplitStateManager } from "./SessionSplitStateManager";

describe("SessionSplitStateManager", () => {
  describe("currentState", () => {
    it("reflects its constituent StateManagers' initial states, joined", async () => {
      // Arrange
      const sessionStateManager = new TestStateManager("session");
      const worldStateManager = new TestStateManager("world");
      const stateManager = new SessionSplitStateManager(
        sessionStateManager,
        worldStateManager,
      );

      // Act
      const result = stateManager.currentState;

      // Assert
      expect(result).toMatchObject({
        session: "session",
        world: "world",
        forAction: undefined,
      });
    });

    it("reflects its constituent StateManagers' post-action states, joined", async () => {
      // Arrange
      const sessionStateManager = new TestStateManager("session");
      const worldStateManager = new TestStateManager("world");
      const stateManager = new SessionSplitStateManager(
        sessionStateManager,
        worldStateManager,
      );
      const action = { type: "ACTION" };

      // Act
      await stateManager.apply(action);
      const result = stateManager.currentState;

      // Assert
      expect(result).toMatchObject({
        session: "session",
        world: "world",
        forAction: action,
      });
    });

    it("prefers session state over world state when joining", async () => {
      // Arrange
      const sessionStateManager = new TestStateManager("session");
      const worldStateManager = new TestStateManager("world");
      const stateManager = new SessionSplitStateManager(
        sessionStateManager,
        worldStateManager,
      );

      // Act
      const result = stateManager.currentState;

      // Assert
      expect(result).toMatchObject({
        both: "session",
      });
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
    this.currentState = {
      [this.identifier]: this.identifier,
      both: this.identifier,
      forAction: undefined,
    };
  }
  apply(action) {
    this.currentState = {
      [this.identifier]: this.identifier,
      both: this.identifier,
      forAction: action,
    };
    return Promise.resolve(this.currentState);
  }
}
