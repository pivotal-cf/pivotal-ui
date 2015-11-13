import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack-stream';

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
      output: {filename: 'spec.js' },
      quiet: true,
      watch: true,
      plugins: options.plugins
    }));
}

gulp.task('jasmine', function() {
  var plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return reactTestAssets(['spec/js/**/*spec.js'], {watch: true, plugins: [plugin]})
    .pipe(plugins.jasmineBrowser.specRunner())
    .pipe(plugins.jasmineBrowser.server({whenReady: plugin.whenReady}));
});
