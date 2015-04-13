'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var config = require('./config');

gulp.task('images', function() {
  return gulp
  .src(config.src+'./images/**/*')
  .pipe(imagemin({
    use: [pngquant({quality:'65-85'})]
  }))
  .pipe(gulp.dest(config.dest+'./images'))
  ;
});


