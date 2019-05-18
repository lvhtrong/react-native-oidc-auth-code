const gulp = require('gulp')
const eslint = require('gulp-eslint')

gulp.task('lint', () =>
  gulp
    .src(['src/**/*.js'])
    .pipe(eslint('../../.eslintrc.js'))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
)
