import { SceneStateGenerator } from "./SceneStateGenerator";

describe("SceneStateGenerator", () => {
  describe("apply", () => {
    it("Switches scenes when given 'scene.advance'", async () => {
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
      const stateGenerator = new SceneStateGenerator(sceneLookup);
      const action = { type: "scene.advance", nextSceneName: "NEXT_SCENE" };

      // Act
      const result = await stateGenerator.apply(action, initialScene);

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
      const stateGenerator = new SceneStateGenerator(sceneLookup);
      const action = { type: "misc" };

      // Act
      const result = await stateGenerator.apply(action, initialScene);

      // Assert
      expect(result).toEqual(initialScene);
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
      const stateGenerator = new SceneStateGenerator(sceneLookup);
      const action = { type: "misc" };

      // Act
      const result = await stateGenerator.apply(action, initialScene);

      // Assert
      expect(result).toEqual(initialScene);
    });

    it("Throws when given non-scene-advance actions and not initialized", async () => {
      // Arrange
      const sceneLookup = buildSceneLookup([]);
      const stateGenerator = new SceneStateGenerator(sceneLookup);
      const action = { type: "misc" };

      // Act
      const resultPromise = stateGenerator.apply(action, undefined);

      // Assert
      expect(resultPromise).rejects.toThrow();
    });
  });
});

function buildSceneLookup(scenes) {
  return (name) => scenes.find((scene) => scene.name === name);
}
