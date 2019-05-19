import gulp from 'gulp'
import conventionalChangelog from 'gulp-conventional-changelog'

export const updateChangelog = () =>
  gulp
    .src('CHANGELOG.md')
    .pipe(
      conventionalChangelog(
        {
          // conventional-changelog options go here
          preset: 'angular'
        },
        {
          // context goes here
        },
        {
          // git-raw-commits options go here
        },
        {
          // conventional-commits-parser options go here
        },
        {
          // conventional-changelog-writer options go here
        }
      )
    )
    .pipe(gulp.dest('./'))

gulp.task('changelog:update', updateChangelog)
