var gulp = require('gulp');
var rename = require('gulp-rename');
var gutil = require("gulp-util");

/* Post css deps */
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var colorFunction = require("postcss-color-function");
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

/* JS Deps */
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var settings = require('./settings');
var dir = settings.paths;

//build css
gulp.task('css', function() {
	var processors = [
	atImport({path: [dir.pcss]}),
	require('postcss-mixins'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	autoprefixer({browsers: ['last 2 version']}),
	colorFunction()
	];
	if (!settings.debug){ //minify for prod
		processors.push(cssnano());
	}
	return gulp.src(dir.pcss + '[^_]*.pcss')
	.pipe(postcss(processors))
	.pipe(rename({extname: '.css'}))
 	.pipe(gulp.dest(dir.build.css));
}
);

//build js
gulp.task("js", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

//default build
gulp.task('default', ['css','js']);

gulp.task('watch', function () {
	gulp.watch([dir.pcss +'*.pcss',dir.pcss +'components/*.pcss'],['css']);
	gulp.watch([dir.js + '*.js'],['webpack:build']);
	});
