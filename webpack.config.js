const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: path.join(__dirname, 'src/app.js'),
    vendors: ['react', 'react-dom']
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Learning webpack and react',
      template: path.join(__dirname, 'index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime']
        }
      }
    }]
  }
};