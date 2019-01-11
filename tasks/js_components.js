import del from 'del';
import gulp from 'gulp';
const plugins = require('gulp-load-plugins')();

const COPYRIGHT = '/*(c) Copyright 2018 Pivotal Software, Inc. All Rights Reserved.*/\n';
const buildFolder = 'dist/js';

gulp.task('js-build-src', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.babel())
    .pipe(plugins.header(COPYRIGHT))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('js-clean', callback => del([buildFolder], callback));

gulp.task('js-build', gulp.series('js-clean', 'js-build-src'));