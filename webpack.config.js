var path = require("path");
var webpack = require("webpack");
var settings = require('./settings')
//var dir = require("../settings").paths;
const STATIC_DIR = settings.paths.static;
var debug = process.env.NODE_ENV !== 'production';


module.exports = {
	cache: true,
	entry: STATIC_DIR + "js/index.js",
	output: {
		path: settings.paths.build.js,
		publicPath: 'static',
		filename: "main.js"
	},
	module: {
		loaders: [
				// required for bootstrap icons
			{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
			{ test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.eot$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.json$/, loader: "json-loader" }
		]
	},
	plugins: debug ? [new webpack.ProvidePlugin({jQuery: "jquery",$: "jquery"})]
	: [
	new webpack.ProvidePlugin({jQuery: "jquery",$: "jquery"}),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	]
};
