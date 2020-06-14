import { StateManager } from "../../kernel/StateManager";
import { buildStateManager } from "./buildStateManager";

describe("buildStateManager", () => {
  describe("result.currentState", () => {
    it("reflects the compound, joined initial state of the given SubStateManagerMaps", async () => {
      // Arrange
      const sessionName = "SessionName";
      const worldName = "WorldName";
      const sessionSubStateManagerMap = {
        part1: new TestStateManager("session.part1"),
        part2: new TestStateManager("session.part2"),
      };
      const worldSubStateManagerMap = {
        part1: new TestStateManager("world.part1"),
        part2: new TestStateManager("world.part2"),
      };
      const storage = {
        readValue: jest.fn().mockResolvedValue("StoredValue"),
        writeValue: jest.fn().mockResolvedValue(),
      };
      const storageFactory = () => storage;

      // Act
      const stateManager = buildStateManager(
        sessionName,
        worldName,
        sessionSubStateManagerMap,
        worldSubStateManagerMap,
        storageFactory,
      );
      const result = stateManager.currentState;

      // Assert
      expect(result).toMatchObject({
        part1: {
          "session.part1": "session.part1",
          "world.part1": "world.part1",
          both: "session.part1",
          forAction: undefined,
        },
        part2: {
          "session.part2": "session.part2",
          "world.part2": "world.part2",
          both: "session.part2",
          forAction: undefined,
        },
      });
    });

    it("reflects the compound, joined post-action state of the given SubStateManagerMaps", async () => {
      // Arrange
      const sessionName = "SessionName";
      const worldName = "WorldName";
      const sessionSubStateManagerMap = {
        part1: new TestStateManager("session.part1"),
        part2: new TestStateManager("session.part2"),
      };
      const worldSubStateManagerMap = {
        part1: new TestStateManager("world.part1"),
        part2: new TestStateManager("world.part2"),
      };
      const storage = {
        readValue: jest.fn().mockResolvedValue("StoredValue"),
        writeValue: jest.fn().mockResolvedValue(),
      };
      const storageFactory = () => storage;
      const action = {};

      // Act
      const stateManager = buildStateManager(
        sessionName,
        worldName,
        sessionSubStateManagerMap,
        worldSubStateManagerMap,
        storageFactory,
      );
      await stateManager.apply(action);
      const result = stateManager.currentState;

      // Assert
      expect(result).toMatchObject({
        part1: {
          "session.part1": "session.part1",
          "world.part1": "world.part1",
          both: "session.part1",
          forAction: action,
        },
        part2: {
          "session.part2": "session.part2",
          "world.part2": "world.part2",
          both: "session.part2",
          forAction: action,
        },
      });
    });
  });

  describe("result.apply", () => {
    it("returns the compound, joined result of its constituent StateManagers' `apply` calls", async () => {
      // Arrange
      const sessionName = "SessionName";
      const worldName = "WorldName";
      const sessionSubStateManagerMap = {
        part1: new TestStateManager("session.part1"),
        part2: new TestStateManager("session.part2"),
      };
      const worldSubStateManagerMap = {
        part1: new TestStateManager("world.part1"),
        part2: new TestStateManager("world.part2"),
      };
      const storage = {
        readValue: jest.fn().mockResolvedValue("StoredValue"),
        writeValue: jest.fn().mockResolvedValue(),
      };
      const storageFactory = () => storage;
      const action = {};

      // Act
      const stateManager = buildStateManager(
        sessionName,
        worldName,
        sessionSubStateManagerMap,
        worldSubStateManagerMap,
        storageFactory,
      );
      const result = await stateManager.apply(action);

      // Assert
      expect(result).toMatchObject({
        part1: {
          "session.part1": "session.part1",
          "world.part1": "world.part1",
          both: "session.part1",
          forAction: action,
        },
        part2: {
          "session.part2": "session.part2",
          "world.part2": "world.part2",
          both: "session.part2",
          forAction: action,
        },
      });
    });

    it("stores each individual unit of state", async () => {
      // Arrange
      const sessionName = "SessionName";
      const worldName = "WorldName";
      const sessionSubStateManagerMap = {
        part1: new TestStateManager("session.part1"),
        part2: new TestStateManager("session.part2"),
      };
      const worldSubStateManagerMap = {
        part1: new TestStateManager("world.part1"),
        part2: new TestStateManager("world.part2"),
      };
      const writeSpy = jest.fn().mockResolvedValue();
      const storageFactory = (path) => ({
        readValue: jest.fn().mockResolvedValue("StoredValue").bind(null, path),
        writeValue: writeSpy.bind(null, path),
      });
      const action = {};

      // Act
      const stateManager = buildStateManager(
        sessionName,
        worldName,
        sessionSubStateManagerMap,
        worldSubStateManagerMap,
        storageFactory,
      );
      const result = await stateManager.apply(action);

      // Assert
      expect(writeSpy).toHaveBeenCalledWith(
        "/Worlds/WorldName/part1",
        expect.objectContaining({
          "world.part1": "world.part1",
          both: "world.part1",
          forAction: action,
        }),
      );
      expect(writeSpy).toHaveBeenCalledWith(
        "/Worlds/WorldName/part2",
        expect.objectContaining({
          "world.part2": "world.part2",
          both: "world.part2",
          forAction: action,
        }),
      );
      expect(writeSpy).toHaveBeenCalledWith(
        "/Sessions/SessionName/part1",
        expect.objectContaining({
          "session.part1": "session.part1",
          both: "session.part1",
          forAction: action,
        }),
      );
      expect(writeSpy).toHaveBeenCalledWith(
        "/Sessions/SessionName/part2",
        expect.objectContaining({
          "session.part2": "session.part2",
          both: "session.part2",
          forAction: action,
        }),
      );
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
