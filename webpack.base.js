const RouteConfigGenerator = require("./plugins/RouteConfigGenerator");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new RouteConfigGenerator({
      indexPage: "Home",
      routeConfig: "./routes/routes.config.js",
      pagesFolder: "./src/pages",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["./public/*", "./build/*"],
    }),
  ],
};
