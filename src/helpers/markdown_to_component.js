import unified from 'unified';
import reactRenderer from 'remark-react';
import HeadingRenderer from '../components/renderers/heading_renderer';
import PreRenderer from '../components/renderers/pre_renderer';
import TableRenderer from '../components/renderers/table_renderer';
import ImageRenderer from '../components/renderers/image_renderer';
import Anchor from '../components/anchor';

const processor = unified().use(reactRenderer, {
  sanitize: false,
  remarkReactComponents: {
    h1: HeadingRenderer(1),
    h2: HeadingRenderer(2),
    h3: HeadingRenderer(3),
    h4: HeadingRenderer(4),
    h5: HeadingRenderer(5),
    h6: HeadingRenderer(6),
    pre: PreRenderer,
    table: TableRenderer,
    img: ImageRenderer,
    a: Anchor
  }
});

const toUri = str => '/' + str.toLowerCase().replace(/[ ]+/g, '-').replace(/[^a-z0-9_.\-]/g, '');

const sectionTitleToRoute = (title, pageRoute, sectionIndex) => {
  if (sectionIndex === 0) return pageRoute;
  return `${pageRoute}${toUri(title)}`;
};

const markdownFileToComponent = ({fileName, json}) => {
  const file = fileName.replace(/^\.\//, '');
  const pageMetadata = {};
  const pageSections = [];
  let pageRoute;

  json.children.forEach(child => {
    if (child.type === 'yaml') {
      Object.assign(pageMetadata, child.data.parsedValue || {});
      return;
    }

    if (child.type === 'heading' && child.depth === 1) {
      pageSections.push({title: child.children[0].value, rawContent: []});
      return;
    }

    if (!pageSections.length) pageSections.push({rawContent: []});
    pageSections[pageSections.length - 1].rawContent.push(child);
  });

  pageRoute = toUri(pageMetadata.route || pageMetadata.title);

  pageSections.forEach((section, i) => {
    const {rawContent, title} = section;
    const toProcess = {type: 'root', children: rawContent};
    section.route = sectionTitleToRoute(title, pageRoute, i);
    section.SectionComponent = () => processor.stringify(processor.runSync(toProcess));
  });

  if (pageMetadata && pageMetadata.reactPath) {
    const componentPath = pageMetadata.reactPath.split('/').pop();
    const exported = require(`pivotal-ui/react/${componentPath}`);
    Object.entries(exported).forEach(([key, value]) => {
      window[key] = value;
    });
  }

  return {
    file,
    route: pageRoute,
    pageMetadata,
    pageSections
  };
};

export default markdownFileToComponent;