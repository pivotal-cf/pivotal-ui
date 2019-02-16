import unified from 'unified';
import parse from 'remark-parse';
import frontmatter from 'remark-frontmatter';
import parseYaml from 'remark-parse-yaml';

export default function(source) {
  const processor = unified().use(parse).use(frontmatter).use(parseYaml);
  try {
    return processor.runSync(processor.parse(source));
  } catch (err) {
    console.error(err.message);
    return '{}';
  }
};