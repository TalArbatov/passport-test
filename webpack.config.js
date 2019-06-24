const path = require('path');
const publicPath = path.join(__dirname, 'client', 'public');
const config = require('./config');
module.exports = {
  entry: './client/src',
  output: {
    filename: 'bundle.js',
    path: publicPath
  },
  mode: config.isPorduction ? 'production' : 'development',
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }],
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    hot: true,
    contentBase: './client/src'
  }
}

