import license from './helpers/license-helper';
import del from 'del';
import highland from 'highland';
import gulp from 'gulp';
import readmeTemplate from '../templates/react/README';
import path from 'path';
import runSequence from 'run-sequence';
import {componentDocs} from '../helpers/documentation_helper';
import {packageJson} from './helpers/react-components-helper';
import {publishPackages} from './helpers/publish-helper';
import {readArray} from 'event-stream';

const plugins = require('gulp-load-plugins')();
const argv = require('yargs').argv;

const COPYRIGHT = '/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/\n';
const componentsGlob = 'src/pivotal-ui-react/*';
const buildFolder = 'dist/react';

gulp.task('react-build-src', function() {
  return gulp.src('src/pivotal-ui-react/**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.babel({stage: 0, optional: ['runtime'], loose: true}))
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
  return highland(gulp.src(componentsGlob))
    .flatMap(function(dir) {
      return highland(
        gulp.src(path.join(dir.path, '*.js'))
          .pipe(plugins.concat(path.basename(dir.path)))
      );
    })
    .map(function(file) {
      const name = path.basename(file.path, 'js');
      const {description, homepage} = require(path.join(path.dirname(file.path), 'package.json'));
      const docs = componentDocs(file);

      return Object.assign(file, {
        base: path.dirname(file.base),
        contents: new Buffer(readmeTemplate(name, docs, {homepage, description})),
        path: path.join(path.dirname(file.path), 'README.md')
      });
    })
    .pipe(gulp.dest(buildFolder));
});

gulp.task('react-clean', callback => del([buildFolder], callback));

gulp.task('react-build', callback => runSequence('react-clean', [
  'react-build-src',
  'react-build-package-json',
  'react-build-license',
  'react-build-readme'
], callback));

gulp.task('react-publish', ['react-build'], () => {
  if (!argv.component) {
    return new Error('Usage: gulp react-publish --component <component-name>');
  }

  return readArray([[{
    name: `pui-react-${argv.component}`,
    dir: path.join('dist', 'react', argv.component)
  }]]).pipe(publishPackages());
});
