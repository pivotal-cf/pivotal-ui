import gulp from 'gulp';

const runSequence = require('run-sequence').use(gulp);
const buildFolder = 'dist';

gulp.task('setup-watchers', (callback) => {
  process.env.WEBPACK_WATCH = true;
  gulp.watch(['src/**/*.js', 'sandbox/index.js', 'sandbox/sandbox.js'], ['sandbox-build-js']);
  gulp.watch(['sandbox/index.html'], ['sandbox-copy-html']);
  gulp.watch(['src/**/*.scss'], ['sandbox-build-sass']);
  callback();
});

gulp.task('build-license', () =>
  gulp.src('LICENSE')
    .pipe(gulp.dest(buildFolder))
);

gulp.task('build-readme', () => {
  return gulp.src('README.md')
    .pipe(gulp.dest(buildFolder));
});

gulp.task('build-package', () => {
  return gulp.src('package.json')
    .pipe(gulp.dest(buildFolder));
});

gulp.task('sandbox', (callback) => runSequence(
  'setup-watchers',
  'sandbox-serve',
  callback
));

gulp.task('start', gulp.series('sandbox', 'spec-server'));

gulp.task('build', gulp.series(
  'build-license',
  'build-readme',
  'build-package',
  'css-build',
  'react-build',
  'js-build'
));
