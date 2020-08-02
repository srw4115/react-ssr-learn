const path = require("path");

const nodeExternals = require("webpack-node-externals");

const config = {
  target: "node",
  mode: "development",
  entry: "./src/server/index.js",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "build/"),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
