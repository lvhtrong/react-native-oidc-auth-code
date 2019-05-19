const gulp = require('gulp')
const eslint = require('gulp-eslint')

export const lintJs = () =>
  gulp
    .src(['src/**/*.js'])
    .pipe(eslint('../../.eslintrc.js'))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())

gulp.task('lint:js', lintJs)
