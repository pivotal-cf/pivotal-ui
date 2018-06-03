import React from 'react';
import unified from 'unified';
import reactRenderer from 'remark-react';
import HeadingRenderer from '../components/renderers/heading_renderer';
import PreRenderer from '../components/renderers/pre_renderer';
import TableRenderer from '../components/renderers/table_renderer';
import Page from '../components/page';

const markdownFileToComponent = ({route, file, json, category}) => {
  const pageMetadata = json.children[0]
    && json.children[0].type === 'yaml'
    && json.children[0].data
    && json.children[0].data.parsedValue;

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
      table: TableRenderer
    }
  });

  const transformed = processor.runSync(json);
  const markdownContent = processor.stringify(transformed);

  return {
    pageMetadata,
    PageComponent: props => <Page {...{
      ...props, route, file, category, pageMetadata, markdownContent
    }}/>
  };
};

export default markdownFileToComponent;