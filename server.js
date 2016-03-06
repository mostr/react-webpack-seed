var webpack = require('webpack');
var http = require('http');
var express = require('express');

var webpackConfig = require('./webpack.config.js');
webpackConfig.entry.app.unshift("webpack-hot-middleware/client");

var compiler = webpack(webpackConfig);

var app = express();

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true}
}));

app.use(require("webpack-hot-middleware")(compiler));

var server = http.createServer(app);
var port = 8080;
server.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
