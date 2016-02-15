var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

// styles task
gulp.task('styles', function() {
	return gulp.src('app/css/*.css')
		.pipe(concat('all.css'))
		.pipe(myth())
		.pipe(gulp.dest('dist'));

});

// scripts task
gulp.task('scripts', function() {
	return gulp.src('app/js/*.css')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));

});

