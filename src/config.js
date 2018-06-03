import {version as puiVersion} from 'pivotal-ui/../package.json';
import {repository} from '../package.json';

const config = {
  puiVersion,
  repository
};

const get = key => config[key];

export default {get};