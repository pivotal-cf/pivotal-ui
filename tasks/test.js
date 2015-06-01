import gulp from 'gulp';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';
const plugins = loadPlugins();

gulp.task('ci', callback => runSequence('set-ci-port', 'rspec', callback));

gulp.task('set-ci-port', () => process.env.STYLEGUIDE_PORT = 9001);

gulp.task('rspec', ['monolith-serve'], function(done) {
  exec('rspec test/features', function(exitStatus) {
    if (exitStatus !== 0) {
      console.error('Exiting: Specs Failed');
      process.exit(exitStatus);
    }
    plugins.connect.serverClose();
    done();
  });
});
