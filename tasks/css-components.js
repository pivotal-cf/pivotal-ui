var cssnext = require('cssnext');
var del = require('del');
var extend = require('lodash').extend;
var fs = require('fs');
var gulp = require('gulp');
var mergeStream = require('merge-stream');
var mkdirp = require('mkdirp');
var nodeSass = require('node-sass');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var through = require('through2');
var File = require('vinyl');
var runSequence = require('run-sequence');

var {license, packageJson, publish} = require('./packaging');

var packageTemplate = require('../templates/css/package.json');
var readmeTemplate = require('../templates/css/README');

const componentsGlob = ['src/pivotal-ui/components/*', '!src/**/*.scss'];
const buildFolder = 'dist/css';

gulp.task('css-build-license', license(componentsGlob, buildFolder));

gulp.task('css-build-package-json', packageJson(componentsGlob, buildFolder, packageTemplate));

gulp.task('css-build-readme', function() {
  return gulp.src(componentsGlob)
    .pipe(plugins.plumber())
    .pipe(through.obj(function(folder, encoding, callback) {
      const name = path.basename(folder.path);
      const {homepage} = require(path.resolve(folder.path, 'package.json'));

      const usagePath = path.resolve(__dirname, '..', 'src', 'pivotal-ui', 'components', name, 'README.md');
      const additionalIntroPath = path.resolve(__dirname, '..', 'src', 'pivotal-ui', 'components', name, 'ADDITIONAL_INTRO.md');

      const usage = fs.readFileSync(usagePath, 'utf8');
      fs.readFile(additionalIntroPath, 'utf8', function(err, additionalIntro) {
        if (err) additionalIntro = '';
        callback(null, new File({
          contents: new Buffer(readmeTemplate(name, usage, {homepage, additionalIntro})),
          path: path.join(path.basename(folder.path), 'README.md')
        }));
      });
    }))
    .pipe(gulp.dest(buildFolder));
});

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

gulp.task('css-build-bootstrap-package', function() {
  return mergeStream(
    gulp.src('src/bootstrap/README.md'),
    gulp.src('src/bootstrap/package.json'),
    gulp.src('LICENSE'),
    gulp.src('src/bootstrap/*.scss')
      .pipe(plugins.sass({outputStyle: 'compressed'}))
      .pipe(plugins.cssnext())
      .pipe(plugins.rename('bootstrap.css'))
  ).pipe(gulp.dest('dist/css/bootstrap'));
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

gulp.task('css-build-all-package', function() {
  return gulp.src('src/pivotal-ui/pui-css-all/*')
    .pipe(gulp.dest(path.join(buildFolder, 'all')));
});

gulp.task('css-clean', callback => del([buildFolder], callback));

gulp.task('css-build', callback => runSequence('css-clean', [
  'css-build-package-json',
  'css-build-readme',
  'css-build-license',
  'css-build-src',
  'css-build-assets',
  'css-build-bootstrap-package',
  'css-build-variables-and-mixins-package',
  'css-build-all-package'
], callback));

gulp.task('css-publish', ['css-build'], publish('css'));
