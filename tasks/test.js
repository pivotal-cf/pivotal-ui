import gulp from 'gulp';
import runSequence from 'run-sequence';
import webpack from 'webpack-stream';
import {merge} from 'event-stream';

const plugins = require('gulp-load-plugins')();
const {plumber, eslint, if: gulpIf, util: {log, colors}, jasmineBrowser, jasmine} = plugins;

gulp.task('ci', callback => runSequence(
  'lint',
  'jasmine-task-helpers',
  'jasmine-react-ci',
  callback
));

gulp.task('lint', function() {
  const {FIX: fix = true} = process.env;
  return gulp.src([
    'src/pivotal-ui-react/**/*.js',
    'tasks/**/*.js',
    'spec/pivotal-ui-react/**/*.js',
    'spec/task-helpers/**/*.js',
    'phantomjs/*.js'
  ], {base: '.'})
    .pipe(plumber())
    .pipe(eslint({fix}))
    .pipe(eslint.format('stylish'))
    .pipe(gulpIf(file => {
        const fixed = file.eslint && typeof file.eslint.output === 'string';

        if(fixed) {
          log(colors.yellow(`fixed an error in ${file.eslint.filePath}`));
          return true;
        }
        return false;
      },
      gulp.dest('.'))
    )
    .pipe(eslint.failAfterError());
});

gulp.task('jasmine-task-helpers', function() {
  return gulp.src(['spec/task-helpers/**/*_spec.js'])
    .pipe(plumber())
    .pipe(jasmine({includeStackTrace: true}));
});

function reactTestAssets(options = {}) {
  const config = Object.assign(require('../config/webpack.config')('test'), options);

  return gulp.src(['spec/pivotal-ui-react/**/*_spec.js'])
    .pipe(plumber())
    .pipe(webpack(config));
}

gulp.task('jasmine-react-ci', ['react-build-svgs'], function() {
  return reactTestAssets({watch: false})
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless({driver: 'phantomjs'}));
});

gulp.task('jasmine-react', ['react-build-svgs'], function() {
  var plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return reactTestAssets({plugins: [plugin]})
    .pipe(jasmineBrowser.specRunner({
      sourcemappedStacktrace: true
    }))
    .pipe(jasmineBrowser.server({
      throwFailures: true,
      whenReady: plugin.whenReady
    }));
});
