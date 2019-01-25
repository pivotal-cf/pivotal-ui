import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {mergeProps} from '../helpers';

export class TileLayout extends React.Component {
  static propTypes = {
    columns: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    noGutter: PropTypes.bool
  };

  componentDidMount() {
    require('../../css/tile-layout');
  }

  getColumnClasses = columns => {
    if (columns instanceof Object) {
      const classes = [];

      for (let breakpoint in columns) {
        if (columns.hasOwnProperty(breakpoint)) {
          classes.push(`tile-layout-${breakpoint}-${columns[breakpoint]}`);
        }
      }

      return classes;
    } else {
      return `tile-layout-xs-${columns}`;
    }
  };

  render() {
    const {children, columns, noGutter, ...others} = this.props;

    const classes = classnames(
      this.getColumnClasses(columns),
      noGutter ? null : 'tile-gutter',
      'tile-layout'
    );
    const props = mergeProps({className: classes}, others);
    return (<div {...props}>
      {children}
    </div>);
  }
}

export class TileLayoutItem extends React.Component {
  componentDidMount() {
    require('../../css/tile-layout');
  }

  render() {
    return <div {...mergeProps({className: 'tile-item'}, this.props)}/>;
  }
}
