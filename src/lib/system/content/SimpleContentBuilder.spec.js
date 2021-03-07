import { SimpleContentBuilder } from "./SimpleContentBuilder";

describe("SimpleContentBuilder", () => {
  describe("build", () => {
    it("Builds a trivial content object from its arguments", async () => {
      // Arrange
      const builder = new SimpleContentBuilder();
      const type = "text/plain";
      const data = "Once upon a time...";

      // Act
      const content = await builder.build(type, data);

      // Assert
      expect(content).toEqual({
        type,
        value: data,
      });
    });
  });
});
