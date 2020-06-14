import { buildContentResolver } from "./buildContentResolver";

describe("buildStateManager", () => {
  describe("result", () => {
    it("requests content from storage based on the Scene name", async () => {
      // Arrange
      const readSpy = jest.fn().mockResolvedValue('"ContentString"');
      const storageFactory = (path) => ({
        readValue: readSpy.bind(null, path),
        writeValue: jest.fn().mockResolvedValue(),
      });
      const contentIndicator = {
        type: "ContentType",
        name: "ContentName",
      };

      // Act
      const contentResolver = buildContentResolver(storageFactory);
      const result = await contentResolver(contentIndicator);

      // Assert
      expect(readSpy).toHaveBeenCalledWith("ContentName");
    });
    it("returns the object represented by the stored JSON", async () => {
      // Arrange
      const storage = {
        readValue: jest.fn().mockResolvedValue("ContentString"),
        writeValue: jest.fn().mockResolvedValue(),
      };
      const storageFactory = () => storage;
      const contentIndicator = {
        type: "ContentType",
        name: "ContentName",
      };

      // Act
      const contentResolver = buildContentResolver(storageFactory);
      const result = await contentResolver(contentIndicator);

      // Assert
      expect(result).toEqual({ type: "ContentType", value: "ContentString" });
    });
  });
});
