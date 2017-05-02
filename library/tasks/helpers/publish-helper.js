import {exec} from 'child_process';
import path from 'path';
import promisify from 'es6-promisify';
import npm from 'npm';
import {gt} from 'semver';
import {log} from 'gulp-util';

import localNpm from './local-npm-helper';

const npmLoad = promisify(npm.load);

async function filterPackages(packageInfos, packageInfo) {
  const {name, version: localVersion, dir} = packageInfo;

  try {
    const publishedVersion = (await promisify(exec)(`npm show ${name} version`)).trim();

    if (gt(localVersion, publishedVersion)) {
      log('Publishing: ', name, dir);
      (await packageInfos).push(packageInfo);
    } else {
      log('Skipping: ', name, dir);
    }
  } catch (e) {
    if (e.message.match(/npm show/)) {
      log(`Warning: ${name} is not published`);
    } else {
      console.error(e.stack);
    }
  }

  return packageInfos;
}

export function getPackageInfo(file) {
  const {name, version} = JSON.parse(file.contents.toString());

  return {
    name: name,
    version: version,
    dir: path.dirname(file.path)
  };
}

export async function infoForUpdatedPackages(files) {
  const packageInfos = files.map(getPackageInfo);

  return await packageInfos.reduce(filterPackages, []);
}

export function publishPackages(registry) {
  return async (packageInfos) => {
    await npmLoad({});
    const npmPublish = promisify(npm.commands.publish);
    const npmOwner = promisify(npm.commands.owner);
    if (registry) {
      npm.config.set('registry', registry); //
      if (npm.config.get('registry') !== registry) { //
        const e = new Error('Must be pointing at private npm to test locally!');
        console.error(e);
        callback(e);
        return;
      }
    }
    for (const index in packageInfos) {
      let packageInfo = packageInfos[index];
      if (packageInfo && packageInfo.name) {

        await npmPublish([packageInfo.dir]);

        if (!registry) { //sinopia doesn't seem to support maintainers
          const owners = ['charleshansen', 'atomanyih', 'kennyw1019', 'aberkovec', 'esharma', 'chentom88', 'sjolicoeur'];
          for (const owner of owners) {
            await npmOwner(['add', owner, packageInfo.name]);
          }
        }
      } else {
        log('Not a valid package', packageInfo);
      }
    }
  };
}

export function publishFakePackages() {
  return publishPackages(localNpm.registryUrl);
}
