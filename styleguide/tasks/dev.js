import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

const plugins = loadPlugins();
const runSequence = require('run-sequence').use(gulp);

gulp.task('styleguide-serve', ['styleguide-build'], () => {
  plugins.connect.server({
    root: ['build'],
    port: process.env.STYLEGUIDE_PORT || 8000
  });
});

gulp.task('monolith-kill-server', () => plugins.connect.serverClose());

gulp.task('setup-watchers', (callback) => {
  process.env.WEBPACK_WATCH = true;
  gulp.watch(['hologram/**/**', 'docs/**/**'], ['hologram']);
  gulp.watch(['src/**.js'], ['build-js']);
  gulp.watch(['src/**.scss'], ['build-sass']);
  callback();
});

gulp.task('dev', (callback) => runSequence(
  'setup-watchers',
  'styleguide-serve',
  callback
));
