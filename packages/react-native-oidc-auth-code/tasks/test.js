import gulp from 'gulp'
import run from 'gulp-run-command'

export const test = run('yarn test')
test.displayName = 'test'

gulp.task('test', test)
