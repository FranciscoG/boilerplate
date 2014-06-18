var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


/**********************************************
 * Helpers
 */

function timestamp() {
  var currentdate = new Date();
  var datetime = "Last update: " + currentdate.getDate() + "/" +
    (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " +
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + ":" +
    currentdate.getSeconds();
  return datetime;
}

/**********************************************
 * Stylus to CSS 
 * 1. compile to /css
 */

gulp.task('stylus', function () {
  gulp.src('./src/stylus/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css'));
});


/**********************************************
 * Javascript 
 * 1. jshint modules
 * 2. jshint main.js
 * 3. concat to /js
 */

var all_scripts = [
  './src/js/libs/*.js',
  './src/js/modules/**/*.js',
  './src/js/modules/*.js',
  './src/js/main.js'
];

gulp.task('lint_modules', function() {
   return gulp.src('./src/js/modules/**/*.js')
    .pipe(jshint('./src/js/.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('lint_main', function() {
   return gulp.src('./src/js/main.js')
    .pipe(jshint('./src/js/.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('js', ['lint_modules', 'lint_main'], function() {
  gulp.src(all_scripts)
    .pipe(concat('site.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('watch', function(){
    gulp.watch('./src/js/**/**/*.js', ['js']);
    gulp.watch('./src/stylus/**/*.styl', ['stylus']);
});

gulp.task('default', ['js','stylus']);

// just in case I only want to build one at a time
gulp.task('build-js', ['js']);
gulp.task('build-css', ['stylus']);