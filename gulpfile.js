'use strict';

let gulp = require('gulp');
let htmlhint = require('gulp-htmlhint');
let csslint = require('gulp-csslint');
let jshint = require('gulp-jshint');
let minifyCss = require('gulp-clean-css');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let uglifyJs = require('gulp-uglify-es').default;
let imagemin = require('gulp-imagemin');

function handleError(err) {
  console.log(err.toString());
  process.exit(1);
}

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
       evil: true,
       esversion: 6
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
    // .pipe(rename('scripts.min.js'))
    .pipe(uglifyJs()).on('error', handleError)
    .pipe(gulp.dest('dist'));
});

// Minify images
gulp.task('optimize-img', function () {
  return gulp.src('images/*')
    .pipe(imagemin()).on('error', handleError)
    .pipe(gulp.dest('dist/img'));
});