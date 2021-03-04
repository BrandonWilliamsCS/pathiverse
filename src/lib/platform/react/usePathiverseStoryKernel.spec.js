import { renderHook, act } from "@testing-library/react-hooks";

import { usePathiverseStoryKernel } from "./usePathiverseStoryKernel";

describe("usePathiverseStoryKernel", () => {
  it("Returns the initial scene and user state on first render", () => {
    // Arrange
    const initialScene = { name: "scene1" };
    const story = { initialScene };
    const userStateReducer = (prevState, action) => prevState + 1;
    const initialUserState = 0;

    // Act
    const { result } = renderHook(() =>
      usePathiverseStoryKernel(story, userStateReducer, initialUserState),
    );

    // Assert
    const [firstState] = result.current;
    expect(firstState.scene).toBe(initialScene);
    expect(firstState.userState).toBe(initialUserState);
  });

  it("Adjusts current scene when AdvanceSceneAction is handled", async () => {
    // Arrange
    const initialScene = { name: "scene1" };
    const story = { initialScene };
    const userStateReducer = (prevState, action) => prevState + 1;
    const initialUserState = 0;
    const nextScene = { name: "scene2" };
    const firstAction = {
      type: "pathiverse.story.advanceScene",
      scene: nextScene,
    };

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      usePathiverseStoryKernel(story, userStateReducer, initialUserState),
    );
    await act(async () => {
      const [, firstActionHandler] = result.current;
      firstActionHandler(firstAction);
      await waitForNextUpdate();
    });

    // Assert
    const [nextState] = result.current;
    expect(nextState.scene).toEqual(nextScene);
  });

  it("Doesn't adjust current scene when non-AdvanceSceneAction is handled", async () => {
    // Arrange
    const initialScene = { name: "scene1" };
    const story = { initialScene };
    const userStateReducer = (prevState, action) => prevState + 1;
    const initialUserState = 0;
    const firstAction = {
      type: "custom",
    };

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      usePathiverseStoryKernel(story, userStateReducer, initialUserState),
    );
    await act(async () => {
      const [, firstActionHandler] = result.current;
      firstActionHandler(firstAction);
      await waitForNextUpdate();
    });

    // Assert
    const [nextState] = result.current;
    expect(nextState.scene).toEqual(initialScene);
  });

  it("Applies all actions to user state", async () => {
    // Arrange
    const initialScene = { name: "scene1" };
    const story = { initialScene };
    const userStateReducer = (prevState, action) => prevState + 1;
    const initialUserState = 0;
    const nextScene = { name: "scene2" };
    const firstAction = {
      type: "pathiverse.story.advanceScene",
      scene: nextScene,
    };

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      usePathiverseStoryKernel(story, userStateReducer, initialUserState),
    );
    await act(async () => {
      const [, firstActionHandler] = result.current;
      firstActionHandler(firstAction);
      await waitForNextUpdate();
    });

    // Assert
    const [nextState] = result.current;
    expect(nextState.userState).toEqual(1);
  });
});
