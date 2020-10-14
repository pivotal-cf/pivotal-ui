import {version as puiVersion, homepage as puiRepository} from 'pivotal-ui/../package.json';
import {repository} from '../package.json';

const config = {
  puiVersion,
  puiRepository: puiRepository || 'https://github.com/pivotal-cf/pivotal-ui',
  repository: repository || 'https://github.com/pivotal-cf/pui-styleguide'
};

const get = key => config[key];

export default {get};