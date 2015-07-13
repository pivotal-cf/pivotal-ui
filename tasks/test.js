import {exec} from 'child_process';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack-stream';
import {map, merge} from 'event-stream';
import reduce from 'stream-reduce';
import File from 'vinyl';
import path from 'path';
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
  const srcLintStream = gulp.src(['src/pivotal-ui-react/**/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.eslint({
      rulePaths: ['config/eslint-rules/'],
      rules: {'no-object-assign': 2}
    }));

  const otherLintStream = gulp.src(['tasks/**/*.js', 'spec/pivotal-ui-react/**/*.js', 'spec/task-helpers/**/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.eslint());

  return merge(srcLintStream, otherLintStream)
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

gulp.task('css-critic-prepare', ['monolith'], function() {
  const regressionRunnerJsStream = gulp.src('./spec/css/components/*.html', {read: false})
    .pipe(reduce((memo, file) => {
      const name = path.basename(file.path, '.html');
      memo.push(`csscritic.add({url: 'components/${name}.html', desc: '${name}'});`);
      return memo;
    }, []))
    .pipe(map((filelist, callback) => {
      const contents = `window.onload = function() {
  csscritic.addReporter(csscritic.NiceReporter());
  ${filelist.join('\n  ')}
  csscritic.execute();
}`;
      callback(null, new File({path: 'regressionRunner.js', contents: new Buffer(contents)}));
    }))
    .pipe(gulp.dest('./spec/css'));

  const cssCriticAssetsStream = gulp.src('build/**/!(*.html)')
    .pipe(gulp.dest('spec/css/components/'));

  return merge(regressionRunnerJsStream, cssCriticAssetsStream);
});

gulp.task('css-critic', ['css-critic-prepare'], function() {
  return gulp.src('./spec/css/regressionRunner.html')
    .pipe(plugins.open('./spec/css/regressionRunner.html', {app: 'firefox'}));
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
