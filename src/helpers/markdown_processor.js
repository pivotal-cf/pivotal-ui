import unified from 'unified';
import reactRenderer from 'remark-react';
import HeadingRenderer from '../components/renderers/heading_renderer';
import PreRenderer from '../components/renderers/pre_renderer';
import TableRenderer from '../components/renderers/table_renderer';
import ImageRenderer from '../components/renderers/image_renderer';
import LinkRenderer from '../components/renderers/link_renderer';

export default unified().use(reactRenderer, {
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
    a: LinkRenderer
  }
});