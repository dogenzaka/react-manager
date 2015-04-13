'use strict';
var gulp = require('gulp');
var config = require('./config');

gulp.task('fonts', ['bower'], function() {
  return gulp
  .src('./bower_components/material-design-iconic-font/fonts/*')
  .pipe(gulp.dest(config.dest+'/fonts'))
  ;
});

