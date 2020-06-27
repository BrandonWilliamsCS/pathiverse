import { SceneStateManager } from "./SceneStateManager";

describe("SceneStateManager", () => {
  describe("currentState", () => {
    it("reflects the start scene, initially", async () => {
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
      const stateManager = new SceneStateManager(initialScene, [initialScene]);

      // Act
      const result = stateManager.currentState;

      // Assert
      expect(result).toEqual(initialScene);
    });

    it("reflects the result of each action", async () => {
      // Arrange
      const action = { type: "scene.advance", nextSceneName: "SECOND_SCENE" };
      const initialScene = {
        world: "WORLDNAME",
        story: "STORYNAME",
        name: "INITIAL_SCENE",
        summary: undefined,
        branchSummary: undefined,
        contentIndicator: { type: "CONTENT", name: "CONTENT" },
        possibleActions: [action],
      };
      const nextScene = {
        world: "WORLDNAME",
        story: "STORYNAME",
        name: "SECOND_SCENE",
        summary: undefined,
        branchSummary: undefined,
        contentIndicator: { type: "CONTENT", name: "CONTENT" },
        possibleActions: [],
      };
      const sceneLookup = buildSceneLookup([initialScene, nextScene]);
      const stateManager = new SceneStateManager(initialScene, sceneLookup);

      // Act
      await stateManager.apply(action);
      const result = stateManager.currentState;

      // Assert
      expect(result).toEqual(nextScene);
    });
  });

  describe("apply", () => {
    it("Does nothing with non-scene-advance actions", async () => {
      // Arrange
      const action = { type: "misc" };
      const initialScene = {
        world: "WORLDNAME",
        story: "STORYNAME",
        name: "INITIAL_SCENE",
        summary: undefined,
        branchSummary: undefined,
        contentIndicator: { type: "CONTENT", name: "CONTENT" },
        possibleActions: [action],
      };
      const stateManager = new SceneStateManager(initialScene, [initialScene]);

      // Act
      const result = await stateManager.apply(action);

      // Assert
      expect(result).toEqual(initialScene);
    });

    it("Switches scenes when given 'scene.advance'", async () => {
      // Arrange
      const action = { type: "scene.advance", nextSceneName: "SECOND_SCENE" };
      const initialScene = {
        world: "WORLDNAME",
        story: "STORYNAME",
        name: "INITIAL_SCENE",
        summary: undefined,
        branchSummary: undefined,
        contentIndicator: { type: "CONTENT", name: "CONTENT" },
        possibleActions: [action],
      };
      const nextScene = {
        world: "WORLDNAME",
        story: "STORYNAME",
        name: "SECOND_SCENE",
        summary: undefined,
        branchSummary: undefined,
        contentIndicator: { type: "CONTENT", name: "CONTENT" },
        possibleActions: [],
      };
      const sceneLookup = buildSceneLookup([initialScene, nextScene]);
      const stateManager = new SceneStateManager(initialScene, sceneLookup);

      // Act
      const result = await stateManager.apply(action);

      // Assert
      expect(result).toEqual(nextScene);
    });
  });
});

function buildSceneLookup(scenes) {
  return (name) => scenes.find((scene) => scene.name === name);
}
