import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TocSidebar extends Component {
  static propTypes = {
    json: PropTypes.array.isRequired
  };

  render() {
    const {json} = this.props;
    return (
      <div className="toc-sidebar">
        {json
          .filter(({type, depth}) => type === 'heading' && [2, 3].indexOf(depth) !== -1)
          .map(({depth, children: [{value}]}, key) =>
            <div {...{key, className: `heading-${depth}`}}>{value}</div>)}
      </div>
    );
  }
}