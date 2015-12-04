import gulp from 'gulp';
import {exec} from 'child_process';
import promisify from 'es6-promisify';
import runSequence from 'run-sequence';
import {log} from 'gulp-util';

const execPromise = promisify(exec);

gulp.task('build-app-config', () =>
    gulp.src(['config/Staticfile', 'config/nginx.conf'])
      .pipe(gulp.dest('build'))
);

gulp.task('set-styleguide-env-to-production', () => process.env.STYLEGUIDE_ENV = 'production');

gulp.task('release-push-styleguide-verify', () =>
    // Verifies that we're logged in - will prevent future steps if not
    execPromise('cf apps')
      .catch(() => {
        log('Error: could not get apps. Are you logged in to cf and targeting an org and space?');
        process.exit(3);
      })
);

gulp.task('release-push-styleguide', (done) => {
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
  'release-push-styleguide-verify',
  'styleguide-build',
  'build-app-config',
  'release-push-styleguide',
  done
));
