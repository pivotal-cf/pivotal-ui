var ejs = require('gulp-ejs');
var errorHandler = require('./errorHandler.js');
var fs = require('fs');
var gulp = require('gulp');
var open = require('gulp-open');

gulp.task('test', [
  'lint',
  '_cssCritic',
]);

gulp.task('_copyTestAssets', ['assets'], function() {
  return gulp.src([
    'dist/**/*',
  ]).pipe(gulp.dest('./test/dist/'));
});

gulp.task('_createTestFileList', ['assets'], function(done) {
  fs.readdir('./test/components/', function(err, files) {
    if (err) { errorHandler.handleError(err, {callback: done}); }

    gulp.src('./test/regressionRunner.ejs')
      .pipe(ejs({
        files: files
      }, {
        ext: '.js'
      }))
      .pipe(gulp.dest('./test/'))
      .on('end', done);
  });
});

gulp.task('_cssCritic', ['lint', '_copyTestAssets', '_createTestFileList'], function() {
  return gulp.src("./test/regressionRunner.html")
    .pipe(open("./test/regressionRunner.html",{app:"firefox"}));
});
