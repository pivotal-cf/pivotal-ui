import promisify from 'es6-promisify';
import path from 'path';

const globPromise = promisify(require('glob'));

export async function getAllComponents() {
  return (await globPromise('src/{pivotal-ui/components,pivotal-ui-react}/*/package.json')).map(
    (packageJsonPath) => path.dirname(packageJsonPath)
  );
}
