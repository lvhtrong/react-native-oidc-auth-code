const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('build:js', () =>
  gulp
    .src(['src/**/*.js', '!src/**/*.test.js'])
    .pipe(babel())
    .pipe(gulp.dest('lib'))
)
