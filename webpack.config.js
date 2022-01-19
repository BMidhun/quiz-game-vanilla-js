const path = require("path");
const htmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  target: ["web", "es5"],
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [
            "@babel/plugin-transform-async-to-generator",
            "@babel/plugin-transform-runtime",
          ],
        },
      },
    ],
  },
  plugins: [new htmlPlugin({ template: "./public/index.html" })],
  optimization: {
    minimize: true,
    minimizer: [
      (compiler) => {
        const TerserPlugin = require("terser-webpack-plugin");
        new TerserPlugin({
          minify: TerserPlugin.terserMinify,
          test: /\.js$/,
          exclude: /node_modules/,
        }).apply(compiler);
      },
    ],
  },
};
