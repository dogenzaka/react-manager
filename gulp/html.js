'use strict';
var gulp = require('gulp');
var config = require('./config');

gulp.task('html', function() {
  return gulp
  .src(config.src+'/html/*.html')
  .pipe(gulp.dest(config.dest))
  ;
});

