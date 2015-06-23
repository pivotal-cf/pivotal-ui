import {exec} from 'child_process';
import gulp from 'gulp';
import {map} from 'event-stream';
import path from 'path';
import promisify from 'es6-promisify';
import npm from 'npm';
import {log} from 'gulp-util';

const execPromise = promisify(exec);
const npmLoad = promisify(npm.load);

function infoForUpdatedPackages() {
  return map(async (file, callback) => {
    const {name, version: localVersion} = JSON.parse(file.contents.toString());

    try {
      const publishedVersion = (await execPromise(`npm show ${name} version`)).trim();
      if (localVersion === publishedVersion) {
        callback(); // skip it
      }
      else {
        callback(null, {name: name, dir: path.dirname(file.path)});
      }
    }
    catch(e) {
      if (e.message.match(/Not Found/)) {
        log(`Warning: ${name} is not published`);
        callback();
      }
      else {
        callback(e);
      }
    }
  });
}

function publishPackages() {
  return map(async (packageInfo, callback) => {
    try {
      await npmLoad({});

      const npmPublish = promisify(npm.commands.publish);
      const npmOwner = promisify(npm.commands.owner);

      log('Publishing', packageInfo.name);
      await npmPublish([packageInfo.dir]);

      const owners = ['gpleiss', 'mattroyal', 'stubbornella'];
      for (const owner of owners) {
        await npmOwner(['add', owner, packageInfo.name]);
      }
      callback();
    }
    catch(e) {
      console.error(e);
      callback(e);
    }
  });
}

gulp.task('release-publish', ['css-build', 'react-build'], () =>
  gulp.src('dist/{css,react}/*/package.json')
    .pipe(infoForUpdatedPackages())
    .pipe(publishPackages())
);
