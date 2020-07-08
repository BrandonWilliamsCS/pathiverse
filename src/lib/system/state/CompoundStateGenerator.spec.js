import { StateGenerator } from "../../kernel/StateGenerator";
import { CompoundStateGenerator } from "./CompoundStateGenerator";

describe("CompoundStateGenerator", () => {
  describe("apply", () => {
    it("combines the result of its constituent StateGenerators' `apply` calls", async () => {
      // Arrange
      const subStateGeneratorMap = {
        component1: new TestStateGenerator("component1"),
        component2: new TestStateGenerator("component2"),
      };
      const stateGenerator = new CompoundStateGenerator(subStateGeneratorMap);
      const action = { type: "ACTION" };

      // Act
      const result = await stateGenerator.apply(action, undefined);

      // Assert
      expect(result).toMatchObject({
        component1: {
          identifier: "component1",
          forAction: action,
        },
        component2: {
          identifier: "component2",
          forAction: action,
        },
      });
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
