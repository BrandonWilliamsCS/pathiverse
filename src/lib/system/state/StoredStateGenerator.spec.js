import { StateGenerator } from "../../kernel/StateGenerator";
import { StoredStateGenerator } from "./StoredStateGenerator";

describe("StoredStateGenerator", () => {
  describe("apply", () => {
    it("returns the result of its constituent StateGenerators' `apply` calls for non-load actions", async () => {
      // Arrange
      const underlyingStateGenerator = new TestStateGenerator();
      const testStorage = new TestStorage();
      const stateGenerator = new StoredStateGenerator(
        underlyingStateGenerator,
        testStorage,
      );
      const action = { type: "ACTION" };
      const prevState = { prevState: "PREVIOUS_STATE" };

      // Act
      const result = await stateGenerator.apply(action, prevState);

      // Assert
      expect(result).toEqual({
        forAction: action,
        prevState,
      });
    });

    it("saves the resultant state of its constituent StateGenerators' `apply` calls before returning", async () => {
      // Arrange
      const underlyingStateGenerator = new TestStateGenerator();
      const testStorage = new TestStorage();
      const stateGenerator = new StoredStateGenerator(
        underlyingStateGenerator,
        testStorage,
      );
      const action = { type: "ACTION" };
      const prevState = { prevState: "PREVIOUS_STATE" };

      // Act
      await stateGenerator.apply(action, prevState);

      // Assert
      expect(testStorage.storedValue).toMatchObject({
        forAction: action,
        prevState,
      });
    });

    it("loads state for load actions", async () => {
      // Arrange
      const underlyingStateGenerator = new TestStateGenerator();
      const loadedState = { key: "value" };
      const testStorage = new TestStorage(loadedState);
      const stateGenerator = new StoredStateGenerator(
        underlyingStateGenerator,
        testStorage,
      );
      const action = { type: "storage.load" };

      // Act
      const result = await stateGenerator.apply(action);

      // Assert
      expect(result).toEqual(loadedState);
    });
  });
});

class TestStateGenerator extends StateGenerator {
  apply(action, prevState) {
    return Promise.resolve({
      forAction: action,
      prevState,
    });
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
