/* eslint no-console-log:0 no-alert:0 */

import {exec} from 'child_process';
import gulp from 'gulp';
import {merge, map, readArray} from 'event-stream';
import series from 'stream-series';
import path from 'path';
import promisify from 'es6-promisify';
import runSequence from 'run-sequence';
import changelog from 'conventional-changelog';
import {log, colors} from 'gulp-util';
import source from 'vinyl-source-stream';
import semver from 'semver';

import {releaseDest} from './helpers/release-folder-helper';
import {getNewVersion} from './helpers/version-helper';
import {componentsWithChanges, componentsToUpdate, updatePackageJsons} from './helpers/package-version-helper';
import {commitTransform} from './helpers/changelog-helper';
import {writeFileSync} from 'jsonfile';

const prompt = promisify(require('inquirer').prompt, function(val) {
  this.resolve(val);
});
const plugins = require('gulp-load-plugins')();
const execPromise = promisify(exec);
const recommendedBump = promisify(require('conventional-recommended-bump'));

gulp.task('release-update-version', (done) => {
  (async function() {
    const packageJsonPath = path.join(process.cwd(), 'package.json');

    const jsonContents = require(packageJsonPath);
    const versionBumpType = await recommendedBump({preset: 'angular'});

    const recommendedVersion = semver.inc(jsonContents.version, versionBumpType);

    console.log('Current version is', colors.green(jsonContents.version));
    console.log('Recommended bump is', colors.red(versionBumpType), 'to', colors.red(recommendedVersion));

    const versionOptions = [
      ['patch'],
      ['minor'],
      ['major'],
      ['prepatch', 'alpha'],
      ['preminor', 'alpha'],
      ['premajor', 'alpha'],
      ['prerelease', 'alpha']
    ].map((args) => {
        const resultVersion = semver.inc(jsonContents.version, ...args);
        return {
          name: `${args[0]} to ${resultVersion}`,
          value: resultVersion
        };
      });

    const userVersion = (await prompt([{
      type: 'list',
      name: 'version',
      message: 'Please select version:',
      choices: versionOptions
    }])).version;

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

gulp.task('release-generate-changelog', () => {
  const newChangesStream = changelog(
    {preset: 'angular', warn: log},
    {},
    {},
    {noteKeywords: ['BREAKING CHANGE', 'DEPRECATION WARNING']},
    {transform: commitTransform}
  );

  const oldChangesStream = gulp.src('../CHANGELOG.md')
    .pipe(map((file, cb) => cb(null, file.contents)));

  const latestChangesFileStream = newChangesStream
    .pipe(source('LATEST_CHANGES.md'));

  const changelogFileStream = series(newChangesStream, oldChangesStream)
    .pipe(source('CHANGELOG.md'));

  return merge(changelogFileStream, latestChangesFileStream)
    .pipe(gulp.dest('../'));
});

gulp.task('release-commit', () =>
    execPromise(
      `git add package.json \
             ../CHANGELOG.md \
             ../LATEST_CHANGES.md \
             src/pivotal-ui/components/*/package.json \
             src/pivotal-ui-react/*/package.json \
             release/ \
       && git commit -m "v${getNewVersion()}"`
    )
);

gulp.task('release-prepare', (done) =>
    runSequence(
      'release-update-version',
      [
        'release-update-package-versions',
        'release-generate-changelog',
      ],
      done
    )
);
