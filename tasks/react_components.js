import del from 'del';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

const plugins = loadPlugins();
const COPYRIGHT = '/*(c) Copyright 2018 Pivotal Software, Inc. All Rights Reserved.*/\n';
const srcFolder = 'src/react';
const buildFolder = 'dist/react';

gulp.task('react-build-src', function () {
  return gulp.src(`${srcFolder}/**/*.js`)
    .pipe(plugins.plumber())
    .pipe(plugins.babel())
    .pipe(plugins.header(COPYRIGHT))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('react-clean', callback => del([buildFolder], callback));

gulp.task('react-build', gulp.series('react-clean', 'react-build-src'));