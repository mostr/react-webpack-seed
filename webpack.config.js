var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var config = {
	
	entry: [
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

if(process.env.NODE_ENV === 'production') {
	config.devtool = '#source-map';
	config.plugins = [
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
		new HtmlWebpackPlugin({
			template: 'app/index.tpl.html',
			inject: true
		})
	]
}

module.exports = config;