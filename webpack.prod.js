const path = require('path');
const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSS = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|ico|png|jpeg|jpg|bmp|webp|gif|avif|apng)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name]-[hash][ext][query]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [new OptimizeCSS(), new TerserPlugin()],
  },
});
