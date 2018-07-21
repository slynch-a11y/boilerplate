const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./browser/start.js"],
  mode: "development",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // options: {
        //   presets: ['react', 'es2015']
        // }
      },
      {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }
    ]
  }
};
