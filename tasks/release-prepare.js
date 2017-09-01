/* eslint no-console-log:0 no-alert:0 */

import {exec} from 'child_process';
import gulp from 'gulp';
import {merge, map, readArray} from 'event-stream';
import path from 'path';
import promisify from 'es6-promisify';
import runSequence from 'run-sequence';
import {log, colors} from 'gulp-util';
import {argv} from 'yargs';

import {getNewVersion} from './helpers/version-helper';
import {
  componentsWithChanges,
  componentsToUpdate,
  updatePackageJsons
} from './helpers/package-version-helper';
import {writeFileSync} from 'jsonfile';

const execPromise = promisify(exec);

gulp.task('release-update-version', (done) => {
  (async function () {
    const packageJsonPath = path.join(process.cwd(), 'package.json');

    const jsonContents = require(packageJsonPath);

    let userVersion = argv.version;

    if (!userVersion) {
      throw new Error('missing version');
    }

    jsonContents.version = userVersion;

    writeFileSync(packageJsonPath, jsonContents, {spaces: 2});
    delete require.cache[packageJsonPath];
    done();
  })();
});

gulp.task('release-update-package-versions', (done) => {
  componentsWithChanges().then((components) => {
    readArray(components)
      .pipe(componentsToUpdate())
      .pipe(updatePackageJsons())
      .pipe(gulp.dest('.'))
      .on('end', done);
  });
});

gulp.task('release-commit', () =>
  execPromise(
    `git add package.json \
             CHANGELOG.md \
             LATEST_CHANGES.md \
             src/pivotal-ui/components/*/package.json \
             src/pivotal-ui-react/*/package.json \
       && git commit -m "v${getNewVersion()}"`
  )
);

gulp.task('release-prepare', (done) =>
  runSequence(
    'release-update-version',
    'release-update-package-versions',
    done
  )
);
