'use strict'

// Gulp plugins
var gulp          = require( 'gulp' ),
	browserSync   = require( 'browser-sync' ).create(),
	sourcemaps    = require( 'gulp-sourcemaps' ),
	sass          = require( 'gulp-sass' ),
	concat        = require( 'gulp-concat' ),
	rename        = require( 'gulp-rename' ),
	uglify        = require( 'gulp-uglify' );

	sass.compiler = require( 'node-sass' );

// Directories
var source_dir    = './',
	minify_dir    = source_dir + 'minify/',
	maps_dir      = source_dir + 'maps/',
	minifyCss_dir = minify_dir + 'css/',
	minifyJS_dir  = minify_dir + 'js/',
	scss_dir      = source_dir + 'scss/',
	js_dir        = source_dir + 'js/'; 

function serve() {
	
	browserSync.init({
		server: "./"
	});
	
	gulp.watch( scss_dir + '**/*.scss', gulp.parallel( scssMain ));
	gulp.watch( js_dir + '**/*.js', gulp.parallel( compactJS ));
	gulp.watch( '*.html' ).on( 'change', browserSync.reload );
}
 
gulp.task( 'serve', serve );

function scssMain() {
	
	return gulp.src( scss_dir + '**/*.scss' )
		.pipe( sourcemaps.init() )
		.pipe( sass.sync( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
		.pipe( sourcemaps.write( maps_dir ) )
		.pipe( gulp.dest( minifyCss_dir ) )
		.pipe( browserSync.stream() );
}

gulp.task( 'scssMain', scssMain );

function compactJS() {

	return gulp.src( js_dir + '**/*.js' )
		.pipe( concat( 'all.js' ) )
		.pipe( gulp.dest( minifyJS_dir ) )
		.pipe( rename( 'minify.js' ) )
		.pipe( uglify() )
		.pipe( gulp.dest( minifyJS_dir ) )
		.pipe( browserSync.stream() );
}

gulp.task( 'compactJS', compactJS );