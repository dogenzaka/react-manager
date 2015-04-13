'use strict';

var gulp = require('gulp');

// Launch the server
gulp.task('server', ['build'], function() {

  gulp.watch('templates/stylus/**/*', ['stylus']);
  gulp.watch('templates/jade/**/*', ['jade']);
  gulp.watch('components.*', ['components']);
  gulp.watch(['src/**/*.js','src/**/*.jsx'], ['webpack']);
  require('../example/app.js').listen(4000, function() {
    console.log("Server listening port on 4000");
  });

});

