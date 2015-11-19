import {exec} from 'child_process';
import gulp from 'gulp';
import del from 'del';
import loadPlugins from 'gulp-load-plugins';
import {map, pipeline, merge, duplex} from 'event-stream';
import {setup as setupDrF, copyAssets, generateCss} from 'dr-frankenstyle/dev';
import {railsUrls} from 'dr-frankenstyle';
import path from 'path';
import {read} from 'vinyl-file';
import webpack from 'webpack-stream';
import webpackConfig from '../config/webpack';

const plugins = loadPlugins();
const runSequence = require('run-sequence').use(gulp);

gulp.task('monolith-setup-css-cache', () => {
  return setupDrF({cached: false})
    .pipe(copyAssets())
    .pipe(gulp.dest('build/'));
});

gulp.task('monolith-build-css-from-cache', () => {
  const puiCssPrefixRegexp = /^pui-css-/;
  const processPuiCssPackages = pipeline(
    map((cssDependency, callback) => {
      if (puiCssPrefixRegexp.test(cssDependency.packageName)) {
        const componentName = cssDependency.packageName.replace(puiCssPrefixRegexp, '');
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
  );

  const processExternalCssPackages = map((cssDependency, callback) => {
    if (!puiCssPrefixRegexp.test(cssDependency.packageName)) {
      read(cssDependency.path, function(_, file) {
        callback(null, {
          packageName: cssDependency.packageName,
          contents: file.contents.toString()
        });
      });

    } else {
      callback();
    }
  });

  const input = map((data, callback) => callback(null, data));
  const processStyleAssetsStream = duplex(input,
    merge(
      input.pipe(processExternalCssPackages),
      input.pipe(processPuiCssPackages)
    )
  );

  return setupDrF({cached: true})
    .pipe(generateCss(processStyleAssetsStream))
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
      .pipe(webpack(webpackConfig()))
      .pipe(plugins.rename('pivotal-ui.js'))
      .pipe(gulp.dest('build'))
);

gulp.task('monolith-build-react-js', () => {
  const watch = Boolean(process.env.WEBPACK_WATCH);

  const task = gulp.src('./src/pivotal-ui/javascripts/pivotal-ui-react.js')
    .pipe(webpack(webpackConfig({watch: watch})))
    .pipe(plugins.rename('pivotal-ui-react.js'))
    .pipe(gulp.dest('build'));

  if (!watch) {
    return task;
  }
});

gulp.task('monolith-build-styleguide-react-js', () => {
  const watch = Boolean(process.env.WEBPACK_WATCH);

  const task = gulp.src('./src/styleguide/styleguide-react.js')
    .pipe(webpack(webpackConfig({watch: watch})))
    .pipe(plugins.rename('styleguide-react.js'))
    .pipe(gulp.dest('build/styleguide'));

  if (!watch) {
    return task;
  }
});

gulp.task('monolith-zeroclipboard-assets', () =>
    gulp.src('node_modules/zeroclipboard/dist/ZeroClipboard.{js,swf}')
      .pipe(gulp.dest('build/zeroclipboard'))
);

gulp.task('monolith', callback => runSequence('monolith-clean', [
  'monolith-hologram',
  'monolith-html',
  'monolith-styleguide-css',
  'monolith-build-css-from-scratch',
  'monolith-build-js',
  'monolith-build-react-js',
  'monolith-build-styleguide-react-js',
  'monolith-prism-assets',
  'monolith-styleguide-assets',
  'monolith-zeroclipboard-assets',
  'monolith-app-config'
], callback));

