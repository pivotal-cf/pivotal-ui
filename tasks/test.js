require('shelljs/global');
var ejs = require('gulp-ejs');
var connect = require('gulp-connect');
var errorHandler = require('./errorHandler.js');
var fs = require('fs');
var gulp = require('gulp');

gulp.task('ci', [
  'assets',
  '_rspec'
]);

gulp.task('test', [
  '_rspec'
]);

gulp.task('_serveTest', ['assets'], function() {
  connect.server({
    root: ['build'],
    port: 9001
  });
});

gulp.task('_rspec', ['_serveTest'], function(done) {
  exec('rspec test/features', function(exitStatus) {
    if (exitStatus !== 0) {
      errorHandler.handleError('Exiting: Specs Failed', {isFatal: true});
    }
    connect.serverClose();
    done();
  });
});
