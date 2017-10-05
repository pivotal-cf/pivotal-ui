import del from 'del';
import gulp from 'gulp';
import mergeStream from 'merge-stream';
import runSequence from 'run-sequence';
const plugins = require('gulp-load-plugins')();
const buildFolder = 'dist/css';

gulp.task('css-build-src', function() {
  return gulp.src(['src/css/**/*.scss', '!src/css/*.scss'])
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.postcss([
      require('postcss-cssnext')()
    ]))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('css-build-assets', function() {
  return gulp.src('src/css/*/**/!(package.json|*.md|*.scss)')
    .pipe(gulp.dest(buildFolder));
});

gulp.task('css-build-variables-and-mixins-package', function() {
  return mergeStream(
    gulp.src(['src/css/pui-variables.scss', 'src/css/mixins.scss']),
    gulp.src(['PUI_VARIABLES_AND_MIXINS_README.md'])
      .pipe(plugins.rename({basename: 'README'}))
  ).pipe(gulp.dest('dist/css/variables-and-mixins'));
});

gulp.task('css-clean', callback => del([buildFolder], callback));

gulp.task('css-build', callback => runSequence('css-clean', [
  'css-build-src',
  'css-build-assets',
  'css-build-variables-and-mixins-package'
], callback));