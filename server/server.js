const express = require("express");
const path = require("path");

function startServer(staticDir, port) {
  const server = express();
  // All api urls go through the dedicated router
  server.use("/api", buildApiRouter());
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

function buildApiRouter() {
  const apiRouter = express.Router();
  // Story list
  apiRouter.get("/story", (req, res) => {
    res.send("Story List");
  });
  // Scene, based on story url
  apiRouter.get("/story/:storyId/scene/:sceneId", (req, res) => {
    res.send(
      `serving scene ${req.params.sceneId} from story ${req.params.storyId}`,
    );
  });
  // Ensure that all other api urls are 404s.
  apiRouter.get("*", function (req, res) {
    res.status(404).send();
  });
  return apiRouter;
}
