const express = require("express");

const apiRouter = express.Router();

apiRouter.get("/story", (req, res) => {
  res.send("Story List");
});

apiRouter.get("/story/:storyId/scene/:sceneId", (req, res) => {
  res.send(
    `serving scene ${req.params.sceneId} from story ${req.params.storyId}`,
  );
});

apiRouter.get("*", function (req, res) {
  res.status(404).send();
});

module.exports = apiRouter;
