import React, {Component} from 'react';
import PropTypes from 'prop-types';
import unified from 'unified';
import reactRenderer from 'remark-react';

import HeadingRenderer from './HeadingRenderer';
import PreRenderer from './PreRenderer';
import TableRenderer from './TableRenderer';

export default class MarkdownViewer extends Component {
  static propTypes = {
    html: PropTypes.object.isRequired,
    file: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  render() {
    const {html, file, name} = this.props;
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

    const transformed = processor.runSync(html);
    return processor.stringify(transformed);
  }
}
