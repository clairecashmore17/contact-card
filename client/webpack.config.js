const path = require("path");
//importing our html-webapck plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { injectManifest } = require("workbox-build");

module.exports = {
  // sets our starting file to this as our dependency graph
  entry: "./src/js/index.js",
  //output is where the budled files will be generated, we set it to bundle.js
  output: {
    filename: "bundle.js",
    //path sets our directory where the bundled files will be outputted, which we call and send to dist
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    //must create new instance of html plugin and add template and title property
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "Webpack Plugin",
    }),
    //using injectManifest instead of GenerateSW
    new InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      //css files to be handled by the specified loaders
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      //js files to be handled by babel
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
