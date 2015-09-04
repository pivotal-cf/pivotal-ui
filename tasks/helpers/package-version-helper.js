import {map} from 'event-stream';
import {argv} from 'yargs';
import promisify from 'es6-promisify';
import path from 'path';
import through from 'through2';
import {Stream} from 'stream';
import {log} from 'gulp-util';

import {getNewVersion} from './version-helper';

const exec = promisify(require('child_process').exec);
const read = promisify(require('vinyl-file').read);
const globPromise = promisify(require('glob'));

export function componentsWithChanges() {
  const stream = new Stream();
  stream.readable = true;

  (async () => {
    try {

      let components;
      if (argv.updateAll) {
        components = (await globPromise('src/{pivotal-ui/components,pivotal-ui-react}/*/package.json')).map((packageJsonPath) => path.dirname(packageJsonPath));
      }
      else {
        const lastTag = (await exec('git fetch && git describe --tags origin/master')).split('-')[0];
        const diffResults = (await exec(`git diff --dirstat=files,1 HEAD..${lastTag} src/pivotal-ui-react/ src/pivotal-ui/components`)).trim();
        components = diffResults.split('\n').map(diffResult => diffResult.trim().split(' ')[1]);
      }

      for (let component of components) {
        stream.emit('data', component);
      }
    }

    catch(error) {
      log('stream error', error);
      stream.emit('error', error);
    }

    finally {
      stream.emit('end');
    }
  })();

  return stream;
}

function packageNameOf(componentPath) {
  if (componentPath.match(/src\/pivotal-ui\/components\//)) {
    return `pui-css-${path.basename(componentPath)}`;
  }
  else if (componentPath.match(/src\/pivotal-ui-react\//)) {
    return `pui-react-${path.basename(componentPath)}`;
  }
  else if (componentPath === './') {
    return 'pivotal-ui-root-package';
  }
  else {
    console.error(`Unknown componentPath ${componentPath}`);
    throw new Error(`Unknown componentPath ${componentPath}`);
  }
}

async function componentsDependentOn(componentPath) {
  const command = `git grep --files-with-matches ${packageNameOf(componentPath)} src/pivotal-ui-react/*/package.json src/pivotal-ui/components/*/package.json package.json`;
  try {
    return (await exec(command)).trim().split('\n')
      .map((filename) => path.dirname(filename) + path.sep);
  }
  catch(error) {
    if (error.code === 1) { // git grep returns no results
      return [];
    }
    throw error;
  }
}

export function componentsToUpdate() {
  const componentsToLookThrough = [];
  const componentsToUpdate = {};

  return through.obj(
    function(componentWithChanges, encoding, callback) {
      componentsToLookThrough.push(componentWithChanges.toString());
      componentsToUpdate[componentWithChanges] = [];
      callback();
    },

    async function(callback) {
      try {
        let component;
        while (Boolean(component = componentsToLookThrough.shift())) {
          for (const dependentComponent of (await componentsDependentOn(component))) {
            if (!componentsToUpdate[dependentComponent]) {
              componentsToLookThrough.push(dependentComponent);
              componentsToUpdate[dependentComponent] = [];
            }
            componentsToUpdate[dependentComponent].push(packageNameOf(component));
          }
        }

        for (component of Object.keys(componentsToUpdate)) {
          this.push({
            component: component,
            dependencies: componentsToUpdate[component]
          });
        }
        callback();
      }
      catch(error) {
        console.error(error.stack);
        callback(error);
      }
    }
  );
}

export function updatePackageJsons() {
  return map(async ({component, dependencies}, callback) => {
    try {
      const packageJsonPath = path.join(component, 'package.json');
      const packageJsonFile = await read(packageJsonPath);
      const packageJsonContents = JSON.parse(packageJsonFile.contents.toString());

      const version = getNewVersion();
      packageJsonContents.version = version;
      for (let dependency of dependencies) {
        packageJsonContents.dependencies[dependency] = version;
      }

      packageJsonFile.contents = new Buffer(JSON.stringify(packageJsonContents, null, 2));
      callback(null, packageJsonFile);
    } catch(error) {
      console.error(error.stack);
      callback(error);
    }
  });
}
