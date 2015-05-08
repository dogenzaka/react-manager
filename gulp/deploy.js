'use strict';

var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

process.env.NODE_ENV = 'production';

gulp.task('deploy', ['build'], function() {


  return gulp
  .src('./build/**/*')
  .pipe(deploy());

});


