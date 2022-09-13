const path = require("path");

module.exports = function (app) {
  // adding a get route using path to allow HTML to be served up by the server
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirnmae, "../../client/index.html"));
  });
};
