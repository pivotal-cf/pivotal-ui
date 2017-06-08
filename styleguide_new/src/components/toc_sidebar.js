import React, {Component} from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash.kebabcase';

export default class TocSidebar extends Component {
  static propTypes = {
    json: PropTypes.array.isRequired
  };

  render() {
    const {json} = this.props;
    return (
      <div className="toc-sidebar">
        <div className="toc">
          {json
            .filter(({type, depth}) => type === 'heading' && [2, 3].indexOf(depth) !== -1)
            .map(({depth, children: [{value}]}, key) =>
              <a {...{
                key,
                className: `heading-${depth}`,
                href: `#${kebabCase(value.toLowerCase())}`
              }}>{value}</a>)}
        </div>
      </div>
    );
  }
}