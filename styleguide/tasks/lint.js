import gulp from 'gulp';
const plugins = require('gulp-load-plugins')();

gulp.task('lint', () =>
    gulp.src(['src/**/*.js', 'tasks/**/*.js'])
      .pipe(plugins.plumber())
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format('stylish'))
      .pipe(plugins.eslint.failOnError())
);
