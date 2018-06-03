import unified from 'unified';
import parse from 'remark-parse';
import frontmatter from 'remark-frontmatter';
import parseYaml from 'remark-parse-yaml';

export default function(source) {
  const processor = unified().use(parse).use(frontmatter).use(parseYaml);
  return processor.run(processor.parse(source));
};