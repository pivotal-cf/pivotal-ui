import {exec} from 'child_process';
import promisify from 'es6-promisify';

const SINOPIA_STORAGE_LOCATION = '~/.local/share/sinopia/storage';
const SINOPIA_SERVER_URL = 'http://localhost:4873/';

module.exports = {
  registryUrl: SINOPIA_SERVER_URL,
  async clean() {
    console.log('Cleaning Sinopia storage at', SINOPIA_STORAGE_LOCATION);
    await promisify(exec)(`rm -rf ${SINOPIA_STORAGE_LOCATION}`);
  }
};