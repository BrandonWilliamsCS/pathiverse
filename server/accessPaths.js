const path = require("path");

function resolveStoryListPath(apiAccessRoot) {
  return path.join(apiAccessRoot, "/story/storyList.json");
}

function resolveScenePath(apiAccessRoot, sceneRootIndicator, scenePath) {
  if (!sceneRootIndicator.requiresContext) {
    return path.join(sceneRootIndicator.value, scenePath);
  }
  const storyListPath = resolveStoryListPath(apiAccessRoot);
  return path.join(storyListPath, sceneRootIndicator.value, scenePath);
}

module.exports = { resolveStoryListPath, resolveScenePath };
