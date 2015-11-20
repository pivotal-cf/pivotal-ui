import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack-stream';
import {spawn} from 'child_process';
import runSequence from 'run-sequence';

const plugins = loadPlugins();

function reactTestAssets(sourcePath, options = {}) {
  return gulp.src(sourcePath)
    .pipe(webpack({
      devtool: 'eval',
      nodeEnv: 'test',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      },
      output: {filename: 'spec.js'},
      quiet: true,
      ...options
    }));
}

gulp.task('jasmine', () => {
  var plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return reactTestAssets(['spec/js/**/*spec.js'], {watch: true, plugins: [plugin]})
    .pipe(plugins.jasmineBrowser.specRunner())
    .pipe(plugins.jasmineBrowser.server({whenReady: plugin.whenReady}));
});

gulp.task('jasmine-ci', function() {
  return reactTestAssets( ['spec/js/**/*spec.js'], {watch: false})
    .pipe(plugins.jasmineBrowser.specRunner({console: true}))
    .pipe(plugins.jasmineBrowser.phantomjs());
});

function rspec(dir, done) {
  const rspec = spawn('rspec', [`spec/${dir}`], {stdio: 'inherit'});
  ['SIGINT', 'SIGTERM'].forEach(e => process.once(e, () => rspec && rspec.kill()));
  rspec.once('close', done);
}

gulp.task('rspec-unit', (done) => {
  rspec('hologram', done);
});

gulp.task('set-ci-port', () => process.env.STYLEGUIDE_PORT = 9001);

gulp.task('rspec-features', (done) => {
  rspec('features', done);
});

gulp.task('rspec', (done) => runSequence(
    'rspec-unit',
    'set-ci-port',
    'styleguide-serve',
    'rspec-features',
    'styleguide-kill-server',
    done
  )
);
