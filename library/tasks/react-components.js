import license from './helpers/license-helper';
import del from 'del';
import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import {packageJson, readme} from './helpers/react-components-helper';
import {publishPackages} from './helpers/publish-helper';

const plugins = require('gulp-load-plugins')();
const argv = require('yargs').argv;

const COPYRIGHT = '/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/\n';
const componentsGlob = 'src/pivotal-ui-react/*';
const buildFolder = 'dist/react';

gulp.task('react-build-src', function() {
  return gulp.src('src/pivotal-ui-react/**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.babel())
    .pipe(plugins.header(COPYRIGHT))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('react-build-license', () =>
  gulp.src(componentsGlob)
    .pipe(license())
    .pipe(gulp.dest(buildFolder))
);

gulp.task('react-build-package-json', () =>
  gulp.src('src/pivotal-ui-react/*/package.json')
    .pipe(packageJson())
    .on('error', (error) => console.error('Failed with error', error))
    .pipe(gulp.dest(buildFolder))
);

gulp.task('react-build-readme', function() {
  return gulp.src(componentsGlob)
    .pipe(readme())
    .pipe(gulp.dest(buildFolder));
});

gulp.task('react-clean', callback => del([buildFolder], callback));

gulp.task('react-build', callback => runSequence('react-clean', [
  'react-build-src',
  'react-build-package-json',
  'react-build-license',
  'react-build-readme'
], callback));

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
