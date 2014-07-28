var gulp = require('gulp');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

/**********************************************
 * Compile Jade Templates
 */

var jade = require('gulp-jade');
gulp.task('build-jade', function() {

  gulp.src('./src/views/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./app/'));
});

/**********************************************
 * Stylus to CSS
 * 1. Generate Style Guide
 * 2. compile to /app/css
 */

var stylus = require('gulp-stylus');
var nib = require('nib');
var gulpkss = require('gulp-kss');
var rename = require("gulp-rename");
var longColor = require("./src/stylus/extend/color.js")

gulp.task('styleguide', function() {
  gulp.src('./src/stylus/**/**/*.styl')
    .pipe(gulpkss({
      overview: './app/styleguide/overview.md',
      templateDirectory: './src/kss-template'
    }))
    .pipe(gulp.dest('./app/styleguide/'));

  gulp.src('./src/stylus/app.styl')
    .pipe(stylus({
      use: [nib(), longColor()],
      errors: true
    }))
    .on("error", handleError)
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./app/styleguide/public/'));
});

gulp.task('base_styl', ['styleguide'], function() {
  return gulp.src('./src/stylus/app.styl')
    .pipe(stylus({
      use: [nib(), longColor()],
      errors: true
    }))
    .on("error", handleError)
    .pipe(gulp.dest('./app/css'));
});

gulp.task('build-css', ['base_styl'], function() {
  return gulp.src('./src/stylus/app-ie8.styl')
    .pipe(stylus({
      use: [nib(), longColor()],
      errors: true
    }))
    .on("error", handleError)
    .pipe(gulp.dest('./app/css'));
});

/**********************************************
 * Javascript
 * 1. jshint modules
 * 2. jshint main.js
 * 3. bundle to /app/js using Browserify to handle dependencies
 */

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('lint_modules', function() {
  return gulp.src('./src/js/modules/**/*.js')
    .pipe(jshint('./src/js/.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('lint_main', function() {
  return gulp.src('./src/js/app.js')
    .pipe(jshint('./src/js/.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('build-js', ['lint_modules', 'lint_main'], function() {
  var bundleStream = browserify('./src/js/app.js').bundle().pipe(source('site.js'));
  return bundleStream.pipe(gulp.dest('./app/js'));
});

/**********************************************
 * Watch
 */

gulp.task('watch', function() {
  gulp.watch('./src/js/**/*.js', ['build-js']); // will jshint first
  gulp.watch('./src/stylus/**/*.styl', ['build-css']);
  gulp.watch('./src/views/**/*.jade', ['build-jade']);
});

/**********************************************
 * Default and specific tasks
 */

gulp.task('default', ['build-jade', 'build-js', 'build-css']);