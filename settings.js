var express = require('express');
var app = express();

var appPath = './app/'
module.exports = {
	paths: {
		static: appPath + 'static/',
		js:  appPath + 'static/js/',
		pcss:  appPath + 'static/pcss/',
		build: {
			css:  appPath + 'static/build/css/',
			js:  appPath + 'static/build/js/'
		},
		views:  appPath + 'views/',
		routes:  appPath + 'routes/'
	},
	debug:(app.get('env') === 'development'),
	compress: true
}