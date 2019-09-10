var gulp = require('gulp');
var del = require('del');
var minify = require('gulp-minify');
var stripDebug = require('gulp-strip-debug');
var gulpif = require('gulp-if');
const changed = require('gulp-changed');
var gutil = require('gulp-util');
// var exec = require('gulp-exec');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');

gulp.task('docs', function(callback) {
	var docsPath = 'docs/';
	del([docsPath + '*'], callback);
	return gulp.src('dist/**/*').pipe(gulp.dest(docsPath));
});

gulp.task('getProcessEnv', function(done) {
	done();
});
