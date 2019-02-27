import del from 'del';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import {reactSrcFolder, reactBuildFolder, copyrightHeader} from './common';

const plugins = loadPlugins();

gulp.task('react-build-src', () => {
  return gulp.src(`${reactSrcFolder}/**/*.js`)
    .pipe(plugins.plumber())
    .pipe(plugins.babel())
    .pipe(plugins.header(copyrightHeader))
    .pipe(gulp.dest(reactBuildFolder));
});

gulp.task('react-clean', callback => del([reactBuildFolder], callback));

gulp.task('react-build', gulp.series('react-clean', 'react-build-src'));