const gulp = require('gulp')
const babel = require('gulp-babel')

export const buildJs = () =>
  gulp
    .src(['src/**/*.js', '!src/**/*.test.js'])
    .pipe(babel())
    .pipe(gulp.dest('lib'))

gulp.task('build:js', buildJs)
