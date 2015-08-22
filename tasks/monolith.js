import {exec} from 'child_process';
import gulp from 'gulp';
import del from 'del';
import loadPlugins from 'gulp-load-plugins';
import {map, pipeline} from 'event-stream';
import {setup as setupDrF, copyAssets, generateCss} from 'dr-frankenstyle/dev';
import {railsUrls} from 'dr-frankenstyle';
import path from 'path';
import {read} from 'vinyl-file';
import webpack from 'webpack-stream';

const plugins = loadPlugins();
const runSequence = require('run-sequence').use(gulp);

gulp.task('monolith-clean', callback => del(['build'], callback));

gulp.task('monolith-hologram', callback => exec('bundle exec hologram', callback));

gulp.task('monolith-setup-css-cache', () => {
  return setupDrF({cached: false})
    .pipe(copyAssets())
    .pipe(gulp.dest('build/'));
});

gulp.task('monolith-build-css-from-cache', () => {
  return setupDrF({cached: true})
    .pipe(generateCss(
      pipeline(
        map((cssDependency, callback) => {
          if (cssDependency.packageName.slice(0, 8) === 'pui-css-') {
            const componentName = cssDependency.packageName.replace(/^pui-css-/, '');
            read(`src/pivotal-ui/components/${componentName}/${componentName}.scss`, callback);
          } else {
            callback();
          }
        }),

        plugins.sass(),

        plugins.cssnext(),

        map((file, callback) => {
          callback(null, {
            packageName: `pui-css-${path.basename(file.path, '.css')}`,
            contents: file.contents.toString()
          });
        })
      )
    ))
    .pipe(plugins.rename('pivotal-ui.css'))
    .pipe(gulp.dest('build/'))
    .pipe(railsUrls())
    .pipe(plugins.rename('pivotal-ui-rails.css'))
    .pipe(gulp.dest('build/'));
});

gulp.task('monolith-build-css-from-scratch', callback => runSequence('monolith-setup-css-cache', 'monolith-build-css-from-cache', callback));

gulp.task('monolith-html', () =>
  gulp.src('src/styleguide/pane.html')
    .pipe(gulp.dest('build'))
);

gulp.task('monolith-styleguide-css', () =>
  gulp.src('src/styleguide/styleguide.scss')
    .pipe(plugins.sass())
    .pipe(plugins.cssnext())
    .pipe(gulp.dest('build/styleguide'))
);

gulp.task('monolith-build-js', () =>
  gulp.src('./src/pivotal-ui/javascripts/pivotal-ui.js')
    .pipe(webpack(require('../config/webpack/development')))
    .pipe(plugins.rename('pivotal-ui.js'))
    .pipe(gulp.dest('build'))
);

gulp.task('monolith-build-react-js', () => {
  const watch = Boolean(process.env.WEBPACK_WATCH);

  const task = gulp.src('./src/pivotal-ui/javascripts/pivotal-ui-react.js')
    .pipe(webpack(Object.assign({}, require('../config/webpack/development'), {watch: watch})))
    .pipe(plugins.rename('pivotal-ui-react.js'))
    .pipe(gulp.dest('build'));

  if (!watch) {
    return task;
  }
});

gulp.task('monolith-prism-assets', () =>
  gulp.src('node_modules/prismjs/themes/{prism,prism-okaidia}.css')
    .pipe(gulp.dest('build/prismjs'))
);

gulp.task('monolith-styleguide-assets', () =>
  gulp.src([
    'src/styleguide/*.js',
    'src/styleguide/github.css',
    'src/images/*'
  ]).pipe(gulp.dest('build/styleguide'))
);

gulp.task('monolith-zeroclipboard-assets', () =>
  gulp.src('node_modules/zeroclipboard/dist/ZeroClipboard.{js,swf}')
    .pipe(gulp.dest('build/zeroclipboard'))
);

gulp.task('monolith-app-config', () =>
  gulp.src(['src/Staticfile', 'config/nginx.conf'])
    .pipe(gulp.dest('build'))
);

gulp.task('monolith', callback => runSequence('monolith-clean', [
  'monolith-hologram',
  'monolith-html',
  'monolith-styleguide-css',
  'monolith-build-css-from-scratch',
  'monolith-build-js',
  'monolith-build-react-js',
  'monolith-prism-assets',
  'monolith-styleguide-assets',
  'monolith-zeroclipboard-assets',
  'monolith-app-config'
], callback));

gulp.task('monolith-serve', ['monolith'], () => {
  plugins.connect.server({
    root: ['build'],
    port: process.env.STYLEGUIDE_PORT || 8000
  });
});

gulp.task('monolith-kill-server', () => plugins.connect.serverClose());
