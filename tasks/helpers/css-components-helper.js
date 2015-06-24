import fs from 'fs';
import {map} from 'event-stream';
import path from 'path';
import promisify from 'es6-promisify';
import File from 'vinyl';
import readmeTemplate from '../../templates/css/README';
import packageTemplate from '../../templates/css/package.json';
import packageJsonHelper from './package-json-helper';

var readFile = promisify(fs.readFile);

export const packageJson = packageJsonHelper(packageTemplate);

export function readme() {
  return map(async (folder, callback) => {
    const name = path.basename(folder.path);
    const {homepage, description} = require(path.resolve(folder.path, 'package.json'));

    const usagePath = path.resolve(__dirname, '..', '..', 'src', 'pivotal-ui', 'components', name, 'README.md');
    const additionalIntroPath = path.resolve(__dirname, '..', '..', 'src', 'pivotal-ui', 'components', name, 'ADDITIONAL_INTRO.md');

    let usage, additionalIntro;
    try { usage = await(readFile(usagePath, 'utf8')); }
    catch(e) { usage = ''; }
    try { additionalIntro = await(readFile(additionalIntroPath, 'utf8')); }
    catch(e) { additionalIntro = ''; }

    callback(null, new File({
      contents: new Buffer(readmeTemplate(name, {usage, description, homepage, additionalIntro})),
      path: path.join(path.basename(folder.path), 'README.md')
    }));
  });
}
