import promisify from 'es6-promisify';
import path from 'path';


const globPromise = promisify(require('glob'));

let exec = promisify(require('child_process').exec);

export function getTagFromTagString(tagString) {
  return tagString.split('-').slice(0, -2).join('-');
}

export function isBlank(string) {
  return !(string.trim().length);
}

export function getPathsFromDiff(diff) {
  return diff.split('\n').map(
      diffResult => diffResult.trim().split(' ')[1]
  );
}

export async function getLastTag() {
  const tagString = await exec('git fetch && git describe --tags origin/master');
  return getTagFromTagString(tagString);
}

export async function gitDiffMixinsAndVariables(lastTag) {
  return await exec(
    `git diff --name-only HEAD..${lastTag} src/pivotal-ui/components/{mixins,pui-variables}.scss`
  );
}

export async function getChangedComponents(lastTag) {
  const diffResults = (await exec(
    `git diff --dirstat=files,1 HEAD..${lastTag} src/pivotal-ui-react/ src/pivotal-ui/components`
  )).trim();

  return getPathsFromDiff(diffResults);
}

export async function getAllComponents() {
  return (await globPromise('src/{pivotal-ui/components,pivotal-ui-react}/*/package.json')).map(
    (packageJsonPath) => path.dirname(packageJsonPath)
  );
}
