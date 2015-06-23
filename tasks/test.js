import {exec} from 'child_process';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack-stream';
const plugins = loadPlugins();

gulp.task('ci', callback => runSequence(
  'lint',
  'jasmine-task-helpers',
  'set-ci-port',
  'rspec',
  'jasmine-react-ci',
  callback
));

gulp.task('lint', function() {
  return gulp.src(['tasks/**/*.js', 'src/pivotal-ui-react/**/*.js', 'spec/pivotal-ui-react/**/*.js', 'spec/task-helpers/**/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format('stylish'))
    .pipe(plugins.eslint.failOnError());
});

gulp.task('jasmine-task-helpers', function() {
  return gulp.src(['spec/task-helpers/**/*-spec.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.jasmine({includeStackTrace: true}));
});

gulp.task('set-ci-port', () => process.env.STYLEGUIDE_PORT = 9001);

gulp.task('rspec', ['monolith-serve'], function(done) {
  exec('rspec spec/features', function(error) {
    if (error) {
      console.error('Exiting: Specs Failed');
      process.exit(error.code);
    }
    plugins.connect.serverClose();
    done();
  });
});

function reactTestAssets(options = {}) {
  return gulp.src('spec/pivotal-ui-react/**/*_spec.js')
    .pipe(plugins.plumber())
    .pipe(webpack(Object.assign(require('../config/webpack/test'), options)));
}

gulp.task('jasmine-react-ci', function() {
  return reactTestAssets({watch: false})
    .pipe(plugins.jasmineBrowser.specRunner({console: true}))
    .pipe(plugins.jasmineBrowser.phantomjs());
});

gulp.task('jasmine-react', function() {
  var plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return reactTestAssets({watch: true, plugins: [plugin]})
    .pipe(plugins.jasmineBrowser.specRunner())
    .pipe(plugins.jasmineBrowser.server({whenReady: plugin.whenReady}));
});
