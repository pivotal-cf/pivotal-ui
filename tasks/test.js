import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

const plugins = loadPlugins();

const {plumber, eslint, if: gulpIf, util: {log, colors}, jasmine} = plugins;

gulp.task('lint', () => {
  const {FIX: fix = true} = process.env;
  return gulp.src([
    'src/react/**/*.js',
    'tasks/**/*.js',
    'spec/pivotal-ui-react/**/*.js',
    'spec/task-helpers/**/*.js'
  ], {base: '.'})
    .pipe(eslint({fix}))
    .pipe(eslint.format('stylish'))
    .pipe(gulpIf(file => {
        const fixed = file.eslint && typeof file.eslint.output === 'string';

        if(fixed) {
          log(colors.yellow(`fixed an error in ${file.eslint.filePath}`));
          return true;
        }
        return false;
      },
      gulp.dest('.'))
    )
    .pipe(eslint.failAfterError());
});

gulp.task('jasmine-task-helpers', () => {
  return gulp.src(['spec/task-helpers/**/*_spec.js'])
    .pipe(plumber())
    .pipe(jasmine({includeStackTrace: true}));
});

gulp.task('ci', gulp.series(
  'lint',
  'jasmine-task-helpers',
  'react-build-svgs',
  'spec-app'
));
