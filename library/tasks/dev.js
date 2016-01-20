import gulp from 'gulp';

const runSequence = require('run-sequence').use(gulp);

gulp.task('setup-watchers', (callback) => {
  process.env.WEBPACK_WATCH = true;
  gulp.watch(['src/**/*.js', 'sandbox/sandbox.js'], ['sandbox-build-js']);
  gulp.watch(['sandbox/index.html'], ['sandbox-copy-html']);
  gulp.watch(['src/**/*.scss'], ['sandbox-build-sass']);
  callback();
});

gulp.task('dev', (callback) => runSequence(
  'setup-watchers',
  'sandbox-serve',
  callback
));

gulp.task('start', ['dev', 'jasmine-react']);

gulp.task('build', ['css-build', 'react-build']);
