'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var config = require('./config');

gulp.task('webpack', function() {

  var production = process.env.NODE_ENV === 'production';

  return gulp
  .src(config.src + '/js/index.js')
  .pipe(webpack({
    output: {
      filename: 'index.js'
    },
    cache: true,
    debug: !production,
    uglify: production,
    devtool: production ? '' : 'inline-source-map',
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    },
    resolve: {
      extensinos: ['','.js','.jsx']
    },
    externals: [{
      xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }]
  }))
  .pipe(gulp.dest(config.dest+'/js'))
  ;

});

