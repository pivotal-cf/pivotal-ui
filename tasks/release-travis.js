import gulp from 'gulp';

const plugins = require('gulp-load-plugins')();

gulp.task('release-zip', () => {
  const version = require('../package.json').version;

  return gulp.src(`release/pui-v${version}/**/*`, {base: 'release/'})
    .pipe(plugins.zip(`pui.zip`))
    .pipe(gulp.dest('.'));
});