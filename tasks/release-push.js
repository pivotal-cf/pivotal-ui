import {log} from 'gulp-util';
import {exec} from 'child_process';
import promisify from 'es6-promisify';
import gulp from 'gulp';
import {infoForUpdatedPackages, publishPackages} from './helpers/publish-helper';
import runSequence from 'run-sequence';

const execPromise = promisify(exec);

gulp.task('set-styleguide-env-to-production', () => process.env.STYLEGUIDE_ENV = 'production');

gulp.task('release-push-git-verify', async () => {
  const currentSha = await execPromise('git rev-parse HEAD');
  const masterSha = await execPromise('git rev-parse master');
  if (currentSha !== masterSha) {
    log('Error: You must be on master.');
    process.exit(1);
  }

  try {
    await execPromise('git diff --quiet && git diff --cached --quiet');
  } catch (e) {
    log('Error: You have uncommitted changes.');
    process.exit(2);
  }

  return execPromise('git fetch origin');
});

gulp.task('release-push-production-styleguide-verify', () =>
  // Verifies that we're logged in - will prevent future steps if not
  execPromise('cf target -o pivotal -s pivotal-ui')
    .catch(() => {
      log('Error: could not set the org and space. Are you logged in to cf?');
      process.exit(3);
    })
);

gulp.task('release-push-npm-publish', ['css-build', 'react-build'], () =>
  gulp.src('dist/{css,react}/*/package.json')
    .pipe(infoForUpdatedPackages())
    .pipe(publishPackages())
);

gulp.task('release-push-git', async () => {
  const {version} = require('../package.json');
  log(`Cutting tag v${version}`);
  await execPromise(`git tag v${version}`);
  log('Pushing to origin/master');
  await execPromise('git push origin master');
  log('Pushing new tag');
  return await execPromise(`git push origin v${version}`);
});

gulp.task('release-push-production-styleguide', (done) => {
  const deployProcess = exec('cf push');
  deployProcess.stdout.pipe(process.stdout);
  deployProcess.stderr.pipe(process.stderr);
  deployProcess.on('exit', (code) => {
    if (code) { process.exit(code); }
    done();
  });
});

gulp.task('release-push', (done) => runSequence(
  'set-styleguide-env-to-production',
  ['release-push-git-verify', 'release-push-production-styleguide-verify'],
  'release-push-npm-publish',
  'monolith',
  ['release-push-git', 'release-push-production-styleguide'],
  done
));
