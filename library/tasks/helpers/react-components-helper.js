import {map} from 'event-stream';
import File from 'vinyl';
import path from 'path';

import readmeTemplate from '../../templates/react/README';
import packageJsonHelper from './package-json-helper';
import packageTemplate from '../../templates/react/package.json';

export function readme() {
  return map(async (folder, callback) => {
    try {
      const name = path.basename(folder.path);
      const {homepage, description} = require(path.resolve(folder.path, 'package.json'));

      callback(null, new File({
        contents: new Buffer(readmeTemplate(name, {homepage, description})),
        path: path.join(path.basename(folder.path), 'README.md')
      }));
    }
    catch(e) {
      console.error(e.stack);
      callback(e);
    }
  });
}


export const packageJson = packageJsonHelper(packageTemplate);
