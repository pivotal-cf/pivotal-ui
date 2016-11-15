const plugins = require('gulp-load-plugins')();
const {plumber, eslint, if: gulpIf, util: {log, colors}} = require('gulp-load-plugins')();
const gulp = require('gulp');

gulp.task('lint', () => {
  const {FIX: fix = true} = process.env;
  gulp.src(['src/**/*.js', 'tasks/**/*.js'], {base: '.'})
    .pipe(plumber())
    .pipe(eslint({fix}))
    .pipe(eslint.format('stylish'))
    .pipe(gulpIf(file => {
        const fixed = file.eslint && typeof file.eslint.output === 'string';

        if (fixed) {
          log(colors.yellow(`fixed an error in ${file.eslint.filePath}`));
          return true;
        }
        return false;
      },
      gulp.dest('.'))
    )
    .pipe(eslint.failAfterError());
});
