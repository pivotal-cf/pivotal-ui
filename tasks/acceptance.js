import gulp from 'gulp';
import promisify from 'es6-promisify';
import npm from 'npm';
import runSequence from 'run-sequence';

import {infoForUpdatedPackages, publishFakePackages} from './helpers/publish-helper';
import localNpm from './helpers/local-npm-helper';

gulp.task('my-name-is-nic-i-do-acceptance', (done) =>
    runSequence(
      'clean-local',
      'release-update-version',
      'release-update-package-versions',
      'release-push-fake-npm-publish',
      done
    )
);

gulp.task('release-push-fake-npm-publish', ['css-build', 'react-build'], () => {
  return gulp.src('dist/{css,react}/*/package.json')
    .pipe(infoForUpdatedPackages())
    .pipe(publishFakePackages());
});

gulp.task('clean-local', async () => {
  const npmLoad = promisify(npm.load);
  await npmLoad({});

  const cleanPromise = promisify(npm.commands.cache.clean);

  await localNpm.clean();

  await cleanPromise([]);
});
