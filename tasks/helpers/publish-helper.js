import {exec} from 'child_process';
import {map, pipeline} from 'event-stream';
import reduce from 'stream-reduce';
import path from 'path';
import promisify from 'es6-promisify';
import npm from 'npm';
import {gt} from 'semver';
import {log} from 'gulp-util';

const execPromise = promisify(exec);
const npmLoad = promisify(npm.load);

export function infoForUpdatedPackages() {
  return pipeline(
    map(async (file, callback) => {
      const {name, version: localVersion} = JSON.parse(file.contents.toString());

      try {
        const publishedVersion = (await execPromise(`npm show ${name} version`)).trim();
        if (gt(localVersion, publishedVersion)) {
          callback(null, {name: name, dir: path.dirname(file.path)});
        }
        else {
          callback(); // skip it
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
    }),

    reduce((packageInfos, packageInfo) => {
      packageInfos.push(packageInfo);
      return packageInfos;
    }, [])
  );
}

export function publishPackages() {
  return map(async (packageInfos, callback) => {
    try {
      await npmLoad({});

      const npmPublish = promisify(npm.commands.publish);
      const npmOwner = promisify(npm.commands.owner);

      for (const packageInfo of packageInfos) {
        log('Publishing', packageInfo.name);
        await npmPublish([packageInfo.dir]);

        const owners = ['gpleiss', 'mattroyal', 'stubbornella'];
        for (const owner of owners) {
          await npmOwner(['add', owner, packageInfo.name]);
        }
      }
      callback();
    }
    catch(e) {
      console.error(e);
      callback(e);
    }
  });
}
