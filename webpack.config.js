const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./mibreit-lazy-loader/mibreitLazyLoader.min.js",
    library: "mibreitLazyLoader",
    libraryTarget: "var",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  optimization: {
    minimize: true
  },
};