import gulp from 'gulp'
import bump from 'gulp-bump'
import conventionalRecommendedBump from 'conventional-recommended-bump'

export const updateVersion = async () => {
  const recommendation = await new Promise((resolve, reject) => {
    conventionalRecommendedBump(
      {
        preset: 'angular'
      },
      (error, recommendation) => {
        if (error) {
          reject(error)
        } else {
          resolve(recommendation)
        }
      }
    )
  })
  return gulp
    .src(['./package.json'])
    .pipe(
      bump({
        type: recommendation.releaseType
      })
    )
    .pipe(gulp.dest('./'))
}

gulp.task('version:update', updateVersion)
