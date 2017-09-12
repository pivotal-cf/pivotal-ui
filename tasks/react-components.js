import del from 'del';
import gulp from 'gulp';
import runSequence from 'run-sequence';

const plugins = require('gulp-load-plugins')();
const COPYRIGHT = '/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/\n';
const buildFolder = 'dist/react';

gulp.task('react-build-src', function() {
  return gulp.src('src/react/**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.babel())
    .pipe(plugins.header(COPYRIGHT))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('react-clean', callback => del([buildFolder], callback));

gulp.task('react-build', callback => runSequence('react-clean', 'react-build-src', callback));