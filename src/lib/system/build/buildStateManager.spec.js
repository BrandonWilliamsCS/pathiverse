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
      const worldStateManager = new TestStateManager("world");
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
        worldStateManager,
        storageFactory,
      );
      const result = stateManager.currentState;

      // Assert
      expect(result).toMatchObject({
        part1: {
          "session.part1": "session.part1",
          forAction: undefined,
        },
        part2: {
          "session.part2": "session.part2",
          forAction: undefined,
        },
        world: "world",
        forAction: undefined,
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
      const worldStateManager = new TestStateManager("world");
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
        worldStateManager,
        storageFactory,
      );
      await stateManager.apply(action);
      const result = stateManager.currentState;

      // Assert
      expect(result).toMatchObject({
        part1: {
          "session.part1": "session.part1",
          forAction: action,
        },
        part2: {
          "session.part2": "session.part2",
          forAction: action,
        },
        world: "world",
        forAction: action,
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
      const worldStateManager = new TestStateManager("world");
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
        worldStateManager,
        storageFactory,
      );
      const result = await stateManager.apply(action);

      // Assert
      expect(result).toMatchObject({
        part1: {
          "session.part1": "session.part1",
          forAction: action,
        },
        part2: {
          "session.part2": "session.part2",
          forAction: action,
        },
        world: "world",
        forAction: action,
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
      const worldStateManager = new TestStateManager("world");
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
        worldStateManager,
        storageFactory,
      );
      const result = await stateManager.apply(action);

      // Assert
      expect(writeSpy).toHaveBeenCalledWith(
        "/Worlds/WorldName",
        expect.objectContaining({
          world: "world",
          forAction: action,
        }),
      );
      expect(writeSpy).toHaveBeenCalledWith(
        "/Sessions/SessionName",
        expect.objectContaining({
          part1: {
            "session.part1": "session.part1",
            forAction: action,
          },
          part2: {
            "session.part2": "session.part2",
            forAction: action,
          },
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
      forAction: undefined,
    };
  }
  apply(action) {
    this.currentState = {
      [this.identifier]: this.identifier,
      forAction: action,
    };
    return Promise.resolve(this.currentState);
  }
}
