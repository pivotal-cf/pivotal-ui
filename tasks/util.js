var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
module.exports = {
  src: function() {
    return gulp.src.apply(gulp, arguments).pipe(plugins.plumber());
  }
};
