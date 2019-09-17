const webPackMerge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config.base');

module.exports = webPackMerge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './src'),
    filename: 'app.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  }
});
