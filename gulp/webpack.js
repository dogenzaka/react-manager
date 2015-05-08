'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
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
    devtool: production ? '' : 'inline-source-map',
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?stage=0' }
      ]
    },
    resolve: {
      extensinos: ['','.js','.jsx']
    },
    externals: [{
      xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }]
  }))
  .pipe(gulpif(production, uglify()))
  .pipe(gulp.dest(config.dest+'/js'))
  ;

});

