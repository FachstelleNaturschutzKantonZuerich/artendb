'use strict'

var gulp = require('gulp')

gulp.task('watch', function () {
  gulp.watch([
    '_attachments/*',
    'vendor/couchapp/_attachments/*',
    '-vendor/couchapp/_attachments/artendb_browserified.js',
    '-vendor/couchapp/_attachments/artendb_built.js',
    'vendor/couchapp/_attachments/modules/**/*',
    'vendor/couchapp/_attachments/adb_lib/*',
    '-_attachments/style',
    '_attachments/style/*',
    '-_attachments/style/main.css'
  ], [
    'dev'
  ])
})
