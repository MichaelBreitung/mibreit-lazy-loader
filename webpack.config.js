const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
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
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimize: true,
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            properties: {
              regex: /^_/,
            },
          },
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: './styles/mibreitLazyLoader.css' })],
};
