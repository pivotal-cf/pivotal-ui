import {log} from 'gulp-util';
import {exec} from 'child_process';
import promisify from 'es6-promisify';
import gulp from 'gulp';
import {infoForUpdatedPackages, publishPackages} from './helpers/publish-helper';

const execPromise = promisify(exec);

gulp.task('release-git-verify', async () => {
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

gulp.task('release-publish', ['css-build', 'react-build', 'release-git-verify'], () =>
  gulp.src('dist/{css,react}/*/package.json')
    .pipe(infoForUpdatedPackages())
    .pipe(publishPackages())
);

gulp.task('release-push', ['release-publish'], async () => {
  const {version} = require('../package.json');
  log(`Cutting tag v${version}`);
  await execPromise(`git tag v${version}`);
  log('Pushing to origin/master');
  await execPromise('git push origin master');
  log('Pushing new tag');
  return await execPromise(`git push origin v${version}`);
});
