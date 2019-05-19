import { task, series, parallel } from 'gulp'

import { lintJs } from './lint'
import { buildJs } from './build'

const preBuild = parallel(lintJs)

const build = parallel(buildJs)

const prePublish = null

const publish = null

const postPublish = null

// Pre-build (test, lint)
// Build
// Pre-publish (update version, entry file)
// Publish
// Post-publish (commit changes, add tag)
task('release', series(preBuild, build /*, prePublish, publish, postPublish */))
