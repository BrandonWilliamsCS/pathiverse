const express = require("express");
const path = require("path");
const { getContent, getStoryList, getScene } = require("./access");

function startServer(staticDir, apiAccessRoot, port) {
  const server = express();
  // All api urls go through the dedicated router
  server.use("/api", buildApiRouter(apiAccessRoot));
  // Any static file (e.g., css) must be served statically
  server.use(express.static(staticDir));
  // Since the app has path-based routing, any other URL may refer to the app.
  // Serve it and let its routing sort it out.
  server.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, `${staticDir}/index.html`));
  });
  server.listen(port, () => {
    console.log(`Pathiverse server listening on port ${port}`);
  });
}
module.exports = startServer;

function buildApiRouter(apiAccessRoot) {
  const apiRouter = express.Router();
  // Story list
  apiRouter.get("/story/list.json", async (req, res) => {
    const storySpec = await getStoryList(apiAccessRoot);
    res.json(storySpec);
  });
  // Scene, based on story url
  apiRouter.get("/story/:storyId/scene/*", async (req, res) => {
    const storyId = req.params.storyId;
    const scenePath = req.params[0];
    const scene = await getScene(apiAccessRoot, storyId, scenePath);
    res.json(scene);
  });
  // Content, also based on story url
  apiRouter.get("/story/:storyId/content/*", async (req, res) => {
    const storyId = req.params.storyId;
    const contentPath = req.params[0];
    const content = await getContent(apiAccessRoot, storyId, contentPath);
    res.type("text/plain");
    res.send(content);
  });
  // Ensure that all other api urls are 404s.
  apiRouter.get("*", function (req, res) {
    res.status(404).send();
  });
  return apiRouter;
}
