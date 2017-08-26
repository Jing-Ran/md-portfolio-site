var gulp = require('gulp');
var htmlhint = require("gulp-htmlhint");
var csslint = require('gulp-csslint');

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