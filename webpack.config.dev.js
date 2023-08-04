const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    scripts: './src/index.ts', // Your TypeScript entry point
    styles: './src/main.css', // Your CSS entry point
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name]/mibreitLazyLoader.min.js',
    library: 'mibreitLazyLoader',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimize: false,
  },
  plugins: [new MiniCssExtractPlugin({ filename: './styles/mibreitLazyLoader.css' })],
};
