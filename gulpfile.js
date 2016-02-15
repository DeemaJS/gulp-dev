var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');

// styles task

gulp.task('styles', function() {
	return gulp.src('app/css/*.css')
		.pipe(concat('all.css'))
		.pipe(myth())
		.pipe(gulp.dest('dist'));

});
