'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var config = require('./config');

gulp.task('styles', ['bower'], function() {
  return gulp
  .src([config.src+'/styles/main.less'])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(cssmin())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest(config.dest+'/css'))
  ;
});


