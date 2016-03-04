var webpack = require('webpack');
var path = require('path');

module.exports = {
	
	entry: [
		"webpack-hot-middleware/client",
		"babel-polyfill",
		path.resolve(__dirname, "app/app.js")
	],

	output: {
		path: __dirname + '/build',
		publicPath: '/',
		filename: './bundle.js'
	},

	devtool: "cheap-eval-source-map",

	module: {
		loaders: [
			{
			  test: /\.css$/, loader: "style!css",
			  exclude: /node_modules/
			},
			{ 
			  test   : /.js$/,
			  loader : 'babel-loader' ,
			  exclude: /node_modules/
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]

};