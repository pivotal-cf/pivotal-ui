import license from './helpers/license-helper';
import {readme, packageJson} from './helpers/css-components-helper';

var del = require('del');
var gulp = require('gulp');
var mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

var {publish} = require('./helpers/packaging-helper');

const componentsGlob = ['src/pivotal-ui/components/*', '!src/**/*.scss'];
const buildFolder = 'dist/css';

gulp.task('css-build-license', () =>
  gulp.src(componentsGlob)
    .pipe(license())
    .pipe(gulp.dest(buildFolder))
);

gulp.task('css-build-package-json', () =>
  gulp.src('src/pivotal-ui/components/*/package.json')
    .pipe(packageJson())
    .pipe(gulp.dest(buildFolder))
);

gulp.task('css-build-readme', () =>
  gulp.src(componentsGlob)
    .pipe(readme())
    .pipe(gulp.dest(buildFolder))
);

gulp.task('css-build-src', function() {
  return gulp.src(['src/pivotal-ui/components/**/*.scss', '!src/pivotal-ui/components/*.scss'])
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.cssnext())
    .pipe(gulp.dest(buildFolder));
});

gulp.task('css-build-assets', function() {
  return gulp.src('src/pivotal-ui/components/*/**/!(package.json|*.md|*.scss)')
    .pipe(gulp.dest(buildFolder));
});

gulp.task('css-build-variables-and-mixins-package', function() {
  return mergeStream(
    gulp.src(['src/pivotal-ui/components/pui-variables.scss', 'src/pivotal-ui/components/mixins.scss']),
    gulp.src(['PUI_VARIABLES_AND_MIXINS_README.md'])
      .pipe(plugins.rename({basename: 'README'})),
    plugins.file('package.json', JSON.stringify({
      name: 'pui-css-variables-and-mixins',
      version: '0.0.1',
      repository: {
        type: 'git',
        url: 'https://github.com/pivotal-cf/pivotal-ui.git'
      },
      keywords: [
        'pivotal ui',
        'pivotal ui modularized'
      ],
      author: 'Pivotal Software, Inc',
      bugs: {
        url: 'https://github.com/pivotal-cf/pivotal-ui/issues'
      }
    }, null, 2), {src: true})
  ).pipe(gulp.dest('dist/css/variables-and-mixins'));
});

gulp.task('css-clean', callback => del([buildFolder], callback));

gulp.task('css-build', callback => runSequence('css-clean', [
  'css-build-package-json',
  'css-build-readme',
  'css-build-license',
  'css-build-src',
  'css-build-assets',
  'css-build-variables-and-mixins-package'
], callback));

gulp.task('css-publish', ['css-build'], publish('css'));
