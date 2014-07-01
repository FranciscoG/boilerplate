var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var nib = require('nib');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


/**********************************************
 * Stylus to CSS 
 * 1. compile to /css
 */

gulp.task('stylus', function () {
  gulp.src('./src/stylus/app.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./app/css'));
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
    .pipe(gulp.dest('./app/js'));
});

gulp.task('watch', function(){
    gulp.watch('./src/js/**/**/*.js', ['js']);
    gulp.watch('./src/stylus/**/*.styl', ['stylus']);
});

gulp.task('default', ['js','stylus']);

// just in case I only want to build one at a time
gulp.task('build-js', ['js']);
gulp.task('build-css', ['stylus']);