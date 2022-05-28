const express = require("express");
const path = require("path");
const apiRouter = require("./apiRouter");

const server = express();
const port = 3001;
const staticDir = "../build";

server.use("/api", apiRouter);

server.use(express.static(staticDir));

server.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, `${staticDir}/index.html`));
});

server.listen(port, () => {
  console.log(`Pathiverse server listening on port ${port}`);
});
