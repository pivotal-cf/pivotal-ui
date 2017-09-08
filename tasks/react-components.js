import del from 'del';
import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import {publishPackages} from './helpers/publish-helper';

const plugins = require('gulp-load-plugins')();
const argv = require('yargs').argv;

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

gulp.task('react-publish', ['react-build'], async () => {
  if (!argv.component) {
    return new Error('Usage: gulp react-publish --component <component-name>');
  }

  const publish = argv.dry ? publishFakePackages() : publishPackages();

  await publish([
    {
      name: `pui-react-${argv.component}`,
      dir: path.join('dist', 'react', argv.component)
    }
  ]);
});
