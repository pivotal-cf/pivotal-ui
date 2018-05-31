import unified from 'unified';
import parse from 'remark-parse';
import frontmatter from 'remark-frontmatter';
import parseFrontmatter from 'remark-parse-yaml';

export default function(source) {
  const processor = unified()
  .use(parse)
  .use(frontmatter)
  .use(parseFrontmatter);

  return processor.run(processor.parse(source));
};