const path = require("path");

module.exports = {
  // sets our starting file to this as our dependency graph
  entry: "./src/js/index.js",
  //output is where the budled files will be generated, we set it to main.js
  output: {
    filename: "main.js",
    //path sets our directory where the bundled files will be outputted, which we call and send to dist
    path: path.resolve(__dirname, "dist"),
  },
};
