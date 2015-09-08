import {exec} from 'child_process';
import {map, pipeline} from 'event-stream';
import reduce from 'stream-reduce';
import path from 'path';
import promisify from 'es6-promisify';
import npm from 'npm';
import {gt} from 'semver';
import {log} from 'gulp-util';

import localNpm from './local-npm-helper';

const execPromise = promisify(exec);
const npmLoad = promisify(npm.load);

export function infoForUpdatedPackages() {
  return pipeline(
    map(async (file, callback) => {
      const {name, version: localVersion} = JSON.parse(file.contents.toString());
        try {
          const publishedVersion = (await execPromise(`npm show ${name} version`)).trim();
          if (gt(localVersion, publishedVersion)) {
            log('Publishing: ', name, path.dirname(file.path));
            callback(null, {name: name, dir: path.dirname(file.path)});
          } else {
            callback(); // skip it
          }
        }
        catch(e) {
          if (e.message.match(/npm show/)) {
            log(`Warning: ${name} is not published`);
            callback();
          } else {
            log(e);
            callback();
          }
        }
      }
    ),

    reduce((packageInfos, packageInfo) => {
      if (packageInfo) {
        packageInfos.push(packageInfo);
      }
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
      for (const index in packageInfos) {
        let packageInfo = packageInfos[index];
        if (packageInfo && packageInfo.name) {

          await npmPublish([packageInfo.dir]);
          const owners = ['stubbornella', 'ctaymor', 'atomanyih', 'kennyw1019', 'd-reinhold', 'cthompson'];
          for (const owner of owners) {
            await npmOwner(['add', owner, packageInfo.name]);
          }
        } else {
          log('Not a valid package', packageInfo);
        }
      }
      callback();
    }
    catch(e) {
      log(e);
      callback(e);
    }
  });
}

export function publishFakePackages() {
  return map(async (packageInfos, callback) => {
    try {
      await npmLoad({});

      const npmPublish = promisify(npm.commands.publish);

      npm.config.set('registry', localNpm.registryUrl);

      if (npm.config.get('registry') !== localNpm.registryUrl) {
        const e = new Error('Must be pointing at private npm to test locally!');
        console.error(e);
        callback(e);
      } else {

        for (const packageInfo of packageInfos) {
          log('Publishing', packageInfo.name, 'to', localNpm.registryUrl);

          await npmPublish([packageInfo.dir]);
        }

        callback(null, packageInfos);
      }
    }
    catch (e) {
      console.error(e);
      console.error(packageInfos);
      callback(e);
    }
  });
}