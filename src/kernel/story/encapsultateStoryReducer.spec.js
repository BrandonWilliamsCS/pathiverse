import { encapsulateStoryReducer } from "./encapsulateStoryReducer";

describe("encapsulateStoryReducer", () => {
  it("Returns the initial scene and user state in the first state capsule", async () => {
    // Arrange
    const initialScene = { name: "scene1" };
    const userStateReducer = (prevState, action) => prevState + 1;
    const initialUserState = 0;

    // Act
    const [firstState] = encapsulateStoryReducer(
      initialScene,
      userStateReducer,
      initialUserState,
    );

    // Assert
    expect(firstState.scene).toBe(initialScene);
    expect(firstState.userState).toBe(initialUserState);
  });

  it("Adjusts current scene when AdvanceSceneAction is applied", async () => {
    // Arrange
    const initialScene = { name: "scene1" };
    const userStateReducer = (prevState, action) => prevState + 1;
    const initialUserState = 0;

    // Act
    const [, firstApplier] = encapsulateStoryReducer(
      initialScene,
      userStateReducer,
      initialUserState,
    );
    const nextScene = { name: "scene2" };
    const firstAction = {
      type: "pathiverse.story.advanceScene",
      scene: nextScene,
    };
    const [reducedState] = await firstApplier(firstAction);

    // Assert
    expect(reducedState.scene).toBe(nextScene);
  });

  it("Doesn't adjust current scene when non-AdvanceSceneAction is applied", async () => {
    // Arrange
    const initialScene = { name: "scene1" };
    const userStateReducer = (prevState, action) => prevState + 1;
    const initialUserState = 0;

    // Act
    const [, firstApplier] = encapsulateStoryReducer(
      initialScene,
      userStateReducer,
      initialUserState,
    );
    const firstAction = {
      type: "custom",
    };
    const [reducedState] = await firstApplier(firstAction);

    // Assert
    expect(reducedState.scene).toBe(initialScene);
  });

  it("Applies all actions to user state", async () => {
    // Arrange
    const initialScene = { name: "scene1" };
    const userStateReducer = (prevState, action) => prevState + 1;
    const initialUserState = 0;

    // Act
    const [, firstApplier] = encapsulateStoryReducer(
      initialScene,
      userStateReducer,
      initialUserState,
    );
    const nextScene = { name: "scene2" };
    const firstAction = {
      type: "pathiverse.story.advanceScene",
      scene: nextScene,
    };
    const [reducedState] = await firstApplier(firstAction);

    // Assert
    expect(reducedState.userState).toBe(1);
  });
});
