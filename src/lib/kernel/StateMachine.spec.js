import { StateMachine } from "./StateMachine";
import { StateManager } from "./StateManager";

describe("StateMachine", () => {
  describe("<initial render>", () => {
    it("reflects its StateManager's initial state", async () => {
      // Arrange
      const actions = [];
      const rendererWrapper = new TestRendererWrapper(actions);
      const stateManager = new TestStateManager();
      const stateMachine = new StateMachine(
        stateManager,
        testContentResolver,
        rendererWrapper.renderFunction,
      );

      // Act
      stateMachine.start();
      const args = await rendererWrapper.renderArgsPromises[0];

      // Assert
      expect(stateMachine.currentState).toMatchObject({
        forAction: undefined,
      });
    });

    it("gives its StateManager's initial state to its renderer", async () => {
      // Arrange
      const actions = [];
      const rendererWrapper = new TestRendererWrapper(actions);
      const stateManager = new TestStateManager();
      const stateMachine = new StateMachine(
        stateManager,
        testContentResolver,
        rendererWrapper.renderFunction,
      );

      // Act
      stateMachine.start();
      const args = await rendererWrapper.renderArgsPromises[0];

      // Assert
      expect(args.currentState).toMatchObject({
        forAction: undefined,
      });
    });

    it("gives its StateManager's initial scene content to its renderer", async () => {
      // Arrange
      const actions = [];
      const rendererWrapper = new TestRendererWrapper(actions);
      const stateManager = new TestStateManager();
      const stateMachine = new StateMachine(
        stateManager,
        testContentResolver,
        rendererWrapper.renderFunction,
      );

      // Act
      stateMachine.start();
      const args = await rendererWrapper.renderArgsPromises[0];

      // Assert
      expect(args.content.indicator).toEqual(testScene.contentIndicator);
    });
  });

  describe("<after action>", () => {
    it("reflects its StateManager's post-action state", async () => {
      // Arrange
      const actions = [{ type: "ACTION" }];
      const rendererWrapper = new TestRendererWrapper(actions);
      const stateManager = new TestStateManager();
      const stateMachine = new StateMachine(
        stateManager,
        testContentResolver,
        rendererWrapper.renderFunction,
      );

      // Act
      stateMachine.start();
      const args = await rendererWrapper.renderArgsPromises[1];

      // Assert
      expect(stateMachine.currentState).toMatchObject({
        forAction: actions[0],
      });
    });

    it("gives its StateManager's post-action state to its renderer", async () => {
      // Arrange
      const actions = [{ type: "ACTION" }];
      const rendererWrapper = new TestRendererWrapper(actions);
      const stateManager = new TestStateManager();
      const stateMachine = new StateMachine(
        stateManager,
        testContentResolver,
        rendererWrapper.renderFunction,
      );

      // Act
      stateMachine.start();
      const args = await rendererWrapper.renderArgsPromises[1];

      // Assert
      expect(args.currentState).toMatchObject({
        forAction: actions[0],
      });
    });

    it("gives its StateManager's post-action scene content to its renderer", async () => {
      // Arrange
      const actions = [{ type: "ACTION" }];
      const rendererWrapper = new TestRendererWrapper(actions);
      const stateManager = new TestStateManager();
      const stateMachine = new StateMachine(
        stateManager,
        testContentResolver,
        rendererWrapper.renderFunction,
      );

      // Act
      stateMachine.start();
      const args = await rendererWrapper.renderArgsPromises[1];

      // Assert
      expect(args.content.indicator).toEqual(testScene.contentIndicator);
    });
  });
});

const testScene = {
  world: "WORLD",
  story: "STORY",
  name: "SCENE",
  summary: "SUMMARY",
  branchSummary: "BRANCH_SUMMARY",
  contentIndicator: { type: "CONTENT_TYPE" },
  possibleActions: [{ type: "ACTION_TYPE" }],
};

class TestStateManager extends StateManager {
  currentState = { currentScene: testScene, forAction: undefined };
  apply(action) {
    this.currentState = { currentScene: testScene, forAction: action };
    return Promise.resolve(this.currentState);
  }
}

function testContentResolver(indicator) {
  return {
    type: indicator.type,
    indicator: indicator,
  };
}

class TestRendererWrapper {
  currentIndex = 0;
  resolvers = [];
  renderArgsPromises = [];

  constructor(actions) {
    this.renderFunction = this.renderFunction.bind(this);
    // Iterate the process once per action...
    actions.forEach((action) => {
      this.addResolverAndPromise(action);
    });
    // ...and one more time for the last one.
    this.addResolverAndPromise();
  }

  renderFunction(currentState, content, actionHandler) {
    this.resolvers[this.currentIndex]({ currentState, content, actionHandler });
    this.currentIndex += 1;
    return Promise.resolve();
  }

  addResolverAndPromise(action) {
    const promise = new Promise((resolve) => {
      this.resolvers.push(resolve);
    });
    this.renderArgsPromises.push(promise);
    if (action) {
      promise.then((args) => {
        args.actionHandler(action);
      });
    }
  }
}
