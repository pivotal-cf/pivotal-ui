import {exec} from 'child_process';
import gulp from 'gulp';
import promisify from 'es6-promisify';
import npm from 'npm';
import path from 'path';
import {map} from 'event-stream';
import reduce from 'stream-reduce';
import runSequence from 'run-sequence';
import {gt} from 'semver';

const execPromise = promisify(exec);

import {publishFakePackages} from './helpers/publish-helper';
import localNpm from './helpers/local-npm-helper';

gulp.task('my-name-is-nic-i-do-acceptance', (done) =>
    runSequence(
      'clean-local',
      'release-update-version',
      'release-update-package-versions',
      'css-publish-local',
      'react-publish-local',
      done
    )
);

gulp.task('css-publish-local', ['css-build'], () => {
  return gulp.src('dist/css/*')
    .pipe(map(async (folder, callback) => {
      const name = `pui-css-${path.basename(folder.path)}`;
      const publishedVersion = (await execPromise(`npm show ${name} version`)).trim();
      if (gt(localVersion, publishedVersion)) {
        callback(null, {name, dir: folder.path});
      } else {
        callback(); // skip it
      }
    }))
    .pipe(reduce((packageInfos, packageInfo) => {
      packageInfos.push(packageInfo);
      return packageInfos;
    }, []))
    .pipe(publishFakePackages());
});

gulp.task('react-publish-local', ['react-build'], () => {
  return gulp.src('dist/react/*')
    .pipe(map(async (folder, callback) => {
      const name = `pui-react-${path.basename(folder.path)}`;
      const publishedVersion = (await execPromise(`npm show ${name} version`)).trim();
      if (gt(localVersion, publishedVersion)) {
        callback(null, {name, dir: folder.path});
      } else {
        callback(); // skip it
      }
    }))
    .pipe(reduce((packageInfos, packageInfo) => {
      packageInfos.push(packageInfo);
      return packageInfos;
    }, []))
    .pipe(publishFakePackages());
});

gulp.task('clean-local', async () => {
  const npmLoad = promisify(npm.load);
  await npmLoad({});

  const cleanPromise = promisify(npm.commands.cache.clean);

  await localNpm.clean();

  await cleanPromise([]);
});
