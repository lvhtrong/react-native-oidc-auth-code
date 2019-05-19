import { task, series, parallel } from 'gulp'

import { lintJs } from './lint'
import { test } from './test'
import { buildJs } from './build'
import { updateChangelog } from './changelog'

const preBuild = parallel(lintJs, test)

const build = parallel(buildJs)

const prePublish = parallel(series(updateChangelog))

const publish = null

const postPublish = null

// Pre-build (test, lint)
// Build
// Pre-publish (update version, entry file)
// Publish
// Post-publish (revert entry file, commit changes, add tag)
task('release', series(preBuild, build, prePublish /*, publish, postPublish */))
