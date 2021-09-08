const path = require('path');
const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3001,
    static: path.join(__dirname, 'public'),
    hot: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|ico|png|jpeg|jpg|bmp|webp|gif|avif|apng)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext][query]',
        },
      },
    ],
  },
});
