import unified from 'unified';
import parse from 'remark-parse';

export default unified().use(parse).parse;