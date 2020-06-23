import { StateManager } from "../../kernel/StateManager";
import { StoredStateManager } from "./StoredStateManager";

describe("StoredStateManager", () => {
  describe("currentState", () => {
    it("reflects its underlying StateManager's initial state", async () => {
      // Arrange
      const underlyingStateManager = new TestStateManager();
      const testStorage = new TestStorage();
      const stateManager = new StoredStateManager(
        underlyingStateManager,
        testStorage,
      );

      // Act
      const result = stateManager.currentState;

      // Assert
      expect(result).toMatchObject({
        forAction: undefined,
      });
    });

    it("reflects its underlying StateManager's post-action state", async () => {
      // Arrange
      const underlyingStateManager = new TestStateManager();
      const testStorage = new TestStorage();
      const stateManager = new StoredStateManager(
        underlyingStateManager,
        testStorage,
      );
      const action = { type: "ACTION" };

      // Act
      await stateManager.apply(action);
      const result = stateManager.currentState;

      // Assert
      expect(result).toMatchObject({
        forAction: action,
      });
    });
  });

  describe("apply", () => {
    it("returns the result of its constituent StateManagers' `apply` calls", async () => {
      // Arrange
      const underlyingStateManager = new TestStateManager();
      const testStorage = new TestStorage();
      const stateManager = new StoredStateManager(
        underlyingStateManager,
        testStorage,
      );
      const action = { type: "ACTION" };

      // Act
      const result = await stateManager.apply(action);

      // Assert
      expect(result).toMatchObject({
        forAction: action,
      });
    });

    it("saves the resultant state before returning", async () => {
      // Arrange
      const underlyingStateManager = new TestStateManager();
      const testStorage = new TestStorage();
      const stateManager = new StoredStateManager(
        underlyingStateManager,
        testStorage,
      );
      const action = { type: "ACTION" };

      // Act
      await stateManager.apply(action);

      // Assert
      expect(testStorage.storedValue).toMatchObject({
        forAction: action,
      });
    });

    it("translates LoadStoredStateAction to OverwriteAction with the stored state", async () => {
      // Arrange
      const underlyingStateManager = new TestStateManager();
      const loadedState = { key: "value" };
      const testStorage = new TestStorage(loadedState);
      const stateManager = new StoredStateManager(
        underlyingStateManager,
        testStorage,
      );
      const action = { type: "storage.load" };

      // Act
      await stateManager.apply(action);

      // Assert
      const passedAlongAction = underlyingStateManager.currentState.forAction;
      expect(passedAlongAction).toEqual({
        type: "core.overwrite",
        toState: loadedState,
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

class TestStorage {
  constructor(storedValue) {
    this.storedValue = storedValue;
  }
  readValue() {
    return Promise.resolve(this.storedValue);
  }
  writeValue(value) {
    this.storedValue = value;
    return Promise.resolve();
  }
}
