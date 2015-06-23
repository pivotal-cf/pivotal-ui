import {exec} from 'child_process';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';
const plugins = loadPlugins();

gulp.task('ci', callback => runSequence('jasmine-task-helpers', 'set-ci-port', 'rspec', 'lint', 'jasmine-ci', callback));

gulp.task('set-ci-port', () => process.env.STYLEGUIDE_PORT = 9001);

gulp.task('rspec', ['monolith-serve'], function(done) {
  exec('rspec spec/features', function(error) {
    if (error) {
      console.error('Exiting: Specs Failed');
      process.exit(error.code);
    }
    plugins.connect.serverClose();
    done();
  });
});

gulp.task('jasmine-task-helpers', function() {
  return gulp.src(['spec/task-helpers/**/*-spec.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.jasmine({includeStackTrace: true}));
});
