import { StoredContentRetriever } from "./StoredContentRetriever";

describe("StoredContentRetriever", () => {
  describe("retrieve", () => {
    it("Retrieves raw content from storage", async () => {
      // Arrange
      const storageFactory = (path) => ({
        readValue: () => `Content at ${path}`,
      });
      const retriever = new StoredContentRetriever(storageFactory);

      // Act
      const content = await retriever.retrieve({
        type: "test_type",
        name: "test_path",
      });

      // Assert
      expect(content).toEqual("Content at test_path");
    });
  });
});
