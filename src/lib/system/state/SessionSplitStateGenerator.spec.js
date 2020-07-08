import { StateGenerator } from "../../kernel/StateGenerator";
import { SessionSplitStateGenerator } from "./SessionSplitStateGenerator";

describe("SessionSplitStateGenerator", () => {
  describe("apply", () => {
    it("returns the result of its constituent StateGenerators' `apply` calls, joined", async () => {
      // Arrange
      const prevState = [{ joined: true }, { world: true }, { session: true }];
      const sessionStateGenerator = new TestStateGenerator("session");
      const worldStateGenerator = new TestStateGenerator("world");
      const stateGenerator = new SessionSplitStateGenerator(
        sessionStateGenerator,
        worldStateGenerator,
      );
      const action = { type: "ACTION" };

      // Act
      const result = await stateGenerator.apply(action, prevState);

      // Assert
      expect(result).toEqual([
        {
          identifier: "session",
          forAction: action,
          prevState: prevState[2],
        },
        {
          identifier: "world",
          forAction: action,
          prevState: prevState[1],
        },
        {
          identifier: "session",
          forAction: action,
          prevState: prevState[2],
        },
      ]);
    });
  });
});

class TestStateGenerator extends StateGenerator {
  constructor(identifier) {
    super();
    this.identifier = identifier;
  }
  apply(action, prevState) {
    return Promise.resolve({
      identifier: this.identifier,
      forAction: action,
      prevState,
    });
  }
}
