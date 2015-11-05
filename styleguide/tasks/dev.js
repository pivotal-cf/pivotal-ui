import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import del from 'del';
import {exec} from 'child_process';
import drF from 'dr-frankenstyle';

const plugins = loadPlugins();
const runSequence = require('run-sequence').use(gulp);

gulp.task('styleguide-clean', callback => del(['build'], callback));

gulp.task('hologram', callback => exec('bundle exec hologram', callback));

gulp.task('build-component-css', function() {
  return drF()
    .pipe(gulp.dest('build/'));
});

gulp.task('build-css', () =>
    gulp.src('src/styleguide.scss')
      .pipe(plugins.sass())
      .pipe(plugins.cssnext())
      .pipe(gulp.dest('build/styleguide'))
);

gulp.task('styleguide-assets', () =>
    gulp.src([
      //'src/styleguide/*.js',
      'src/github.css',
      //'src/images/*'
    ]).pipe(gulp.dest('build/styleguide'))
);

gulp.task('prism-assets', () =>
    gulp.src('node_modules/prismjs/themes/{prism,prism-okaidia}.css')
      .pipe(gulp.dest('build/prismjs'))
);

gulp.task('styleguide-build', callback => runSequence('styleguide-clean', [
  'hologram',
  'build-css',
  'build-component-css',
  'styleguide-assets',
  'prism-assets',
], callback));

gulp.task('styleguide-serve', ['styleguide-build'], () => {
  plugins.connect.server({
    root: ['build'],
    port: process.env.STYLEGUIDE_PORT || 8000
  });
});

gulp.task('monolith-kill-server', () => plugins.connect.serverClose());

gulp.task('setup-watchers', (callback) => {
  process.env.WEBPACK_WATCH = true;
  gulp.watch(['hologram/**/**'], ['hologram']);
  callback();
});

gulp.task('dev', (callback) => runSequence(
  'setup-watchers',
  'styleguide-serve',
  callback
));
