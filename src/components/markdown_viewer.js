import React, {Component} from 'react';
import PropTypes from 'prop-types';
import unified from 'unified';
import reactRenderer from 'remark-react';

import HeadingRenderer from './renderers/heading_renderer';
import PreRenderer from './renderers/pre_renderer';
import TableRenderer from './renderers/table_renderer';
import 'pivotal-ui/js/prismjs';

const privates = new WeakMap();

export default class MarkdownViewer extends Component {
  static propTypes = {
    json: PropTypes.object.isRequired,
    file: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    privates.set(this, {});
  }

  componentDidUpdate() {
    // eslint-disable-next-line no-undef
    Prism.highlightAll();
  }

  render() {
    const {json, file, name} = this.props;
    if (!json) console.log({file, name, json})
    const cache = privates.get(this);
    if (cache[file]) return cache[file];
    const processor = unified().use(reactRenderer, {
      sanitize: false,
      remarkReactComponents: {
        h1: HeadingRenderer(1),
        h2: HeadingRenderer(2),
        h3: HeadingRenderer(3),
        h4: HeadingRenderer(4),
        h5: HeadingRenderer(5),
        h6: HeadingRenderer(6),
        pre: PreRenderer(file, name),
        table: TableRenderer
      }
    });

    const transformed = processor.runSync(json);
    const stringified = processor.stringify(transformed);
    const jsx = React.cloneElement(stringified, {key: file});
    privates.set(this, {...cache, [file]: jsx});
    return jsx;
  }
}
