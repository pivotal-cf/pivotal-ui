import del from 'del';
import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import {publishPackages} from './helpers/publish-helper';

const plugins = require('gulp-load-plugins')();
const argv = require('yargs').argv;

const COPYRIGHT = '/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/\n';
const buildFolder = 'dist/js';

gulp.task('js-build-src', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.babel())
    .pipe(plugins.header(COPYRIGHT))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('js-clean', callback => del([buildFolder], callback));

gulp.task('js-build', callback => runSequence('js-clean', 'js-build-src', callback));