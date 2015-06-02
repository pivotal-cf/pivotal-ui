var del = require('del');
var fs = require('fs');
var highland = require('highland');
var gulp = require('gulp');
var mkdirp = require('mkdirp');
var packageTemplate = require('../templates/react/package.json');
var readmeTemplate = require('../templates/react/README');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var through = require('through2');
var File = require('vinyl');
var {componentDocs} = require('../helpers/documentation_helper');
var {license, packageJson, publish} = require('./packaging');

const COPYRIGHT = '/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/\n';
const componentsGlob = 'src/pivotal-ui-react/*';
const buildFolder = 'dist/react';

gulp.task('react-build-src', function() {
  return gulp.src('src/pivotal-ui-react/**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.babel({stage: 0}))
    .pipe(plugins.header(COPYRIGHT))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('react-build-license', license(componentsGlob, buildFolder));

gulp.task('react-build-package-json', packageJson(componentsGlob, buildFolder, packageTemplate));

gulp.task('react-build-readme', function() {
  return highland(gulp.src(componentsGlob))
    .flatMap(function(dir) {
      return highland(
        gulp.src(path.join(dir.path, '*.js'))
          .pipe(plugins.concat(path.basename(dir.path)))
      )
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

gulp.task('react-watch', ['react-build'], function() {
  gulp.watch('src/pivotal-ui-react/**/*.js', ['react-build-src']);
  gulp.watch('src/pivotal-ui-react/**/*.json', ['react-build-package-json']);
});

gulp.task('react-publish', ['react-build'], publish('react'));