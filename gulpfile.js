var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var connect = require('connect'); 
var serve = require('serve-static');
var browsersync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var beeper = require('beeper');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');

// Error Helper
function onError(err) {
    beeper();
    console.log(err);
}

// Styles Task
gulp.task('styles', function() {
    return gulp.src('app/css/*.css')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('all.css'))
        .pipe(myth())
        .pipe(gulp.dest('dist'));
});

// Scripts Task
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

// Images Task
gulp.task('images', function() {
    return gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// Server Task
gulp.task('server', function() {
    return connect().use(serve(__dirname))
        .listen(8080)
        .on('listening', function() {
            console.log('Server Running: View at http://localhost:8080');
        });
});

// BrowserSync Task
gulp.task('browsersync', function(cb) {
    browsersync({
        server: {
            baseDir:'./'
        }
    }, cb);
});

// Browserify Task
gulp.task('browserify', function() {
    return browserify('./app/js/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

// Clean Task
gulp.task('clean', function (cb) {
    del(['dist'], cb);
});

// Watch Task
gulp.task('watch', function() {
    gulp.watch('app/css/*.css', gulp.series('clean', 'styles', browsersync.reload));
    gulp.watch('app/js/*.js', gulp.series('clean', 'scripts', browsersync.reload));
    gulp.watch('app/img/*', gulp.series('clean', 'images', browsersync.reload));
});

// Default Task
gulp.task('default', ['clean', 'styles', 'scripts', 'images', 'browsersync', 'watch']);