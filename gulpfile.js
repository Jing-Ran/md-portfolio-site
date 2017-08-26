var gulp = require('gulp');
var htmlhint = require("gulp-htmlhint");
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglifyJs = require('gulp-uglify');

function handleError(err) {
  console.log(err.toString());
  process.exit(1);
}

gulp.task('default', function () {
  console.log('Gulp has run');
});

// Validate HTML
gulp.task('html', function () {
  return gulp.src('./*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter());
});

// Validate CSS
gulp.task('csslint', function () {
  return gulp.src('css/*.css')
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.formatter('compact'))
    .pipe(csslint.formatter('fail'));
});


// Lint JS
gulp.task('jshint', function () {
  return gulp.src('js/*.js')
    .pipe(jshint({
       undef: true,
       browser: true,
       globals: {
         module: true,
         require: true,
         console: true
       },
       // Ignore eval() in calculator.js
       evil: true
     }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

// Uglify & concatenate CSSs to min/
// Change link in html
gulp.task('optimize-css', function () {
  return gulp.src('css/*.css')
    .pipe(concat('main.min.css')).on('error', handleError)
    .pipe(minifyCss()).on('error', handleError)
    .pipe(gulp.dest('dist'));
});

// Uglify & concatenate JSs to min/
// Change link in html
gulp.task('optimize-js', function () {
  return gulp.src('js/*.js')
    .pipe(concat('scripts.js')).on('error', handleError)
    .pipe(rename('scripts.min.js'))
    .pipe(uglifyJs()).on('error', handleError)
    .pipe(gulp.dest('dist'));
});