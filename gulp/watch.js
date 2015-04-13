'use strict';
var gulp = require('gulp');

gulp.task('watch', ['build'], function() {

  gulp.watch([
    './src/js/**/*.js',
    './src/js/**/*.jsx',
  ], ['webpack']);

  gulp.watch('src/styles/**/*.less', ['styles']);

  gulp.watch('src/images/**/*', ['images']);

});

