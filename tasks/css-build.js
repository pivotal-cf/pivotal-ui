import del from 'del';
import gulp from 'gulp';
import mergeStream from 'merge-stream';
import loadPlugins from 'gulp-load-plugins';
import cssnextPlugin from 'postcss-cssnext';
import {cssSrcFolder, cssBuildFolder} from './common';

const plugins = loadPlugins();

gulp.task('css-build-src', () => {
  return gulp.src([`${cssSrcFolder}/**/*.scss`, `!${cssSrcFolder}/*.scss`])
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.postcss([cssnextPlugin()]))
    .pipe(gulp.dest(cssBuildFolder));
});

gulp.task('css-build-assets', () => {
  return gulp.src(`${cssSrcFolder}/*/**/!(package.json|*.md|*.scss)`)
    .pipe(gulp.dest(cssBuildFolder));
});

gulp.task('css-build-variables-and-mixins-package', () => {
  return mergeStream(
    gulp.src([`${cssSrcFolder}/pui-variables.scss`, `${cssSrcFolder}/mixins.scss`]),
  ).pipe(gulp.dest(`${cssBuildFolder}/variables-and-mixins`));
});

gulp.task('css-clean', callback => del([cssBuildFolder], callback));

gulp.task('css-build', gulp.series('css-clean',
  'css-build-src',
  'css-build-assets',
  'css-build-variables-and-mixins-package'
));