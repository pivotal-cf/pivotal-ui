import gulp from 'gulp';
import {exec} from 'child_process';
import thenify from 'thenify';
import runSequence from 'run-sequence';
import {log} from 'gulp-util';

const execPromise = thenify(exec);

gulp.task('build-app-config', () =>
    gulp.src(['config/Staticfile', 'config/nginx.conf'])
      .pipe(gulp.dest('build'))
);

gulp.task('set-styleguide-env-to-production', () => process.env.STYLEGUIDE_ENV = 'production');

gulp.task('release-push-production-styleguide-verify', () =>
    // Verifies that we're logged in - will prevent future steps if not
    execPromise('cf target -o pivotal -s pivotal-ui')
      .catch(() => {
        log('Error: could not set the org and space. Are you logged in to cf?');
        process.exit(3);
      })
);

gulp.task('release-push-production-styleguide', (done) => {
  const deployProcess = exec('cf push');
  deployProcess.stdout.pipe(process.stdout);
  deployProcess.stderr.pipe(process.stderr);
  deployProcess.on('exit', (code) => {
    if (code) { process.exit(code); }
    done();
  });
});

gulp.task('push-styleguide', (done) => runSequence(
  'set-styleguide-env-to-production',
  'release-push-production-styleguide-verify',
  'styleguide-build',
  'build-app-config',
  'release-push-production-styleguide',
  done
));
