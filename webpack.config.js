var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var config = {

  entry: {
    app: path.resolve(__dirname, "app/app.js")
  },

  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].js'
  },

  devtool: "eval-source-map",

  module: {
    loaders: [
      {
        test: /\.css$/, loader: "style!css",
        exclude: /node_modules/
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};

if (process.env.NODE_ENV === 'production') {

  var deps = require('./package.json').dependencies;
  config.entry.vendor = Object.keys(deps);

  config.devtool = '#source-map';
  config.plugins.unshift(
    new CleanWebpackPlugin(['build']),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: true,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}

module.exports = config;