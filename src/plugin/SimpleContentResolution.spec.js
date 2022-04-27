import { SimpleContentResolution } from "./SimpleContentResolution";

describe("SimpleContentResolution", () => {
  describe("resolver", () => {
    it("Retrieves raw content and builds full content based on provided dependencies", async () => {
      // Arrange
      const retriever = new TestContentRetriever("test_content");
      const builder = new TestContentBuilder();
      const resolution = new SimpleContentResolution(retriever, builder);

      // Act
      const content = await resolution.resolver({ type: "test" });

      // Assert
      expect(content).toBe("TEST_CONTENT");
    });
  });
});

class TestContentRetriever {
  constructor(rawContent) {
    this.rawContent = rawContent;
  }
  retrieve() {
    return Promise.resolve(this.rawContent);
  }
}

class TestContentBuilder {
  build(_, rawData) {
    return rawData.toUpperCase();
  }
}
