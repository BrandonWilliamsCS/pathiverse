import { SceneStateManager } from "./SceneStateManager";

describe("SceneStateManager", () => {
  describe("currentState", () => {
    it("throws when not initialized", () => {
      // Arrange
      const sceneLookup = buildSceneLookup([]);
      const stateManager = new SceneStateManager(sceneLookup);

      // Act
      const act = () => stateManager.currentState;

      // Assert
      expect(act).toThrow();
    });

    it("reflects the state generated from the last applied action", async () => {
      // Arrange
      const initialScene = {
        world: "WORLDNAME",
        story: "STORYNAME",
        name: "INITIAL_SCENE",
        summary: undefined,
        branchSummary: undefined,
        contentIndicator: { type: "CONTENT", name: "CONTENT" },
        possibleActions: [],
      };
      const sceneLookup = buildSceneLookup([initialScene]);
      const stateManager = new SceneStateManager(sceneLookup);
      const action = {
        type: "core.initialize",
        initialSceneName: "INITIAL_SCENE",
      };

      // Act
      const expected = await stateManager.apply(action);
      const result = stateManager.currentState;

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe("apply", () => {
    it("throws when given non-init actions and uninitialized", async () => {
      // Arrange
      const nextScene = {
        world: "WORLDNAME",
        story: "STORYNAME",
        name: "NEXT_SCENE",
        summary: undefined,
        branchSummary: undefined,
        contentIndicator: { type: "CONTENT", name: "CONTENT" },
        possibleActions: [],
      };
      const sceneLookup = buildSceneLookup([nextScene]);
      const stateManager = new SceneStateManager(sceneLookup);
      const action = { type: "scene.advance", nextSceneName: "NEXT_SCENE" };

      // Act
      const resultPromise = stateManager.apply(action);

      // Assert
      expect(resultPromise).rejects.toThrow();
    });

    it("Switches scenes when given 'scene.advance' after initialization", async () => {
      // Arrange
      const initialScene = {
        world: "WORLDNAME",
        story: "STORYNAME",
        name: "INITIAL_SCENE",
        summary: undefined,
        branchSummary: undefined,
        contentIndicator: { type: "CONTENT", name: "CONTENT" },
        possibleActions: [],
      };
      const nextScene = {
        world: "WORLDNAME",
        story: "STORYNAME",
        name: "NEXT_SCENE",
        summary: undefined,
        branchSummary: undefined,
        contentIndicator: { type: "CONTENT", name: "CONTENT" },
        possibleActions: [],
      };
      const sceneLookup = buildSceneLookup([initialScene, nextScene]);
      const stateManager = new SceneStateManager(sceneLookup);
      const initializationAction = {
        type: "core.initialize",
        initialSceneName: "INITIAL_SCENE",
      };
      const action = { type: "scene.advance", nextSceneName: "NEXT_SCENE" };

      // Act
      await stateManager.apply(initializationAction);
      const result = await stateManager.apply(action);

      // Assert
      expect(result).toEqual(nextScene);
    });

    it("Does nothing with non-scene-advance actions", async () => {
      // Arrange
      const initialScene = {
        world: "WORLDNAME",
        story: "STORYNAME",
        name: "INITIAL_SCENE",
        summary: undefined,
        branchSummary: undefined,
        contentIndicator: { type: "CONTENT", name: "CONTENT" },
        possibleActions: [],
      };
      const sceneLookup = buildSceneLookup([initialScene]);
      const stateManager = new SceneStateManager(sceneLookup);
      // TODO: use true initialization action
      const initialAction = {
        type: "scene.advance",
        nextSceneName: "INITIAL_SCENE",
      };
      const miscAction = { type: "misc" };

      // Act
      const expected = await stateManager.apply(initialAction);
      const result = await stateManager.apply(miscAction);

      // Assert
      expect(result).toBe(expected);
    });
  });
});

function buildSceneLookup(scenes) {
  return (name) => scenes.find((scene) => scene.name === name);
}
