var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');


// styles task
gulp.task('styles', function() {
	return gulp.src('app/css/*.css')
		.pipe(concat('all.css'))
		.pipe(myth())
		.pipe(gulp.dest('dist'));

});

// scripts task
gulp.task('scripts', function() {
	return gulp.src('app/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));

});

// images task
gulp.task('images', function() {
	return gulp.src('app/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist'));

});

// watch task
gulp.task('watch', function() {
       gulp.watch('app/css/*.css', 'styles');
       gulp.watch('app/js/*.js', 'scripts');
       gulp.watch('app/img/*', 'images');
})

// default task
gulp.task('default', gulp.parallel('styles', 'scripts', 'images', 'watch'));
