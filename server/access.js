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

async function getContent(apiAccessRoot, storyId, contentPath) {
  const storySpec = await getStorySpec(apiAccessRoot, storyId);
  const fullContentPath = resolveScenePath(
    apiAccessRoot,
    storySpec.relativeSceneRoot,
    contentPath,
  );
  return await getRawContents(fullContentPath);
}

module.exports = { getContent, getStoryList, getStorySpec, getScene };

async function getRawContents(path) {
  return fs.readFile(path, { encoding: "utf8" });
}

async function getJsonContents(path) {
  const fileContents = await fs.readFile(path, { encoding: "utf8" });
  return JSON.parse(fileContents);
}
