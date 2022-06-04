const path = require("path");

module.exports = {
  // Allow more more decoupled usage of the server by aliasing its location
  resolve: {
    alias: {
      "pathiverse-server": path.resolve(__dirname, "../server/server.js"),
    },
  },
  // Don't let webpack try to understand express; just pass the require through.
  externals: {
    express: "commonjs2 express",
  },
};
