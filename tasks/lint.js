var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('lint', function() {
  return gulp.src(['tasks/*.js', 'src/pivotal-ui-react/**/*.js', 'spec/pivotal-ui-react/**/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format('stylish'))
    .pipe(plugins.eslint.failOnError());
});
