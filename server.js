var webpack = require('webpack');
var http = require('http');
var express = require('express');

var webpackConfig = require('./webpack.config.js');
var compiler = webpack(webpackConfig);

var app = express();
app.use(require("webpack-dev-middleware")(compiler, {
	noInfo: true, 
	publicPath: webpackConfig.output.publicPath,
	stats: { colors: true }
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

var server = http.createServer(app);
var port = 8080;
server.listen(port, function() {
	console.log("Listening on http://localhost:" + port);
});
