const fs = require("fs/promises");
const { resolveStoryListPath, resolveScenePath } = require("./accessPaths");

async function getStoryList(apiAccessRoot) {
  const fullPath = resolveStoryListPath(apiAccessRoot);
  return await getJsonContents(fullPath);
}

async function getStorySpec(apiAccessRoot, storyId) {
  const storyList = await getStoryList(apiAccessRoot);
  return storyList.find((storySpec) => storySpec.id === storyId);
}

async function getScene(apiAccessRoot, storyId, scenePath) {
  const storySpec = await getStorySpec(apiAccessRoot, storyId);
  const fullScenePath = resolveScenePath(
    apiAccessRoot,
    storySpec.relativeSceneRoot,
    scenePath,
  );
  return await getJsonContents(fullScenePath);
}

module.exports = { getStoryList, getStorySpec, getScene };

async function getJsonContents(path) {
  const fileContents = await fs.readFile(path, { encoding: "utf8" });
  return JSON.parse(fileContents);
}
