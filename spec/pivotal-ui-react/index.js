import {parse} from 'url';
const {query: {file} = {}} = parse(location.href, true);

const context = require.context('../pivotal-ui-react', true, /_spec\.js$/);
context.keys().forEach(key => {
  if (!file) return context(key);
  if (file.includes(key.slice(1))) context(key);
});