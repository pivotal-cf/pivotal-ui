import promisify from 'es6-promisify';
import {log} from 'gulp-util';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

const SINOPIA_SERVER_URL = 'http://localhost:4873/';

module.exports = {
  registryUrl: SINOPIA_SERVER_URL,
  async clean() {
    const config = yaml.safeLoad(fs.readFileSync('../.sinopia/config.yaml', 'utf8'));
    const storageLocation = path.join('..', '.sinopia', config.storage);
    log('Cleaning Sinopia storage at', storageLocation);
    await promisify(rimraf)(storageLocation);
  }
};
