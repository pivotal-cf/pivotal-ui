const React = require('react');
const classnames = require('classnames');
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-tile-layout';

var types = React.PropTypes;

class TileLayout extends React.Component {
  static propTypes = {
    columns: types.oneOfType([
      types.number,
      types.object
    ]),
    noGutter: types.bool
  };

  getColumnClasses(columns) {
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
  }

  render() {
    const {children, columns, noGutter, ...others} = this.props;

    const classes = classnames(
      this.getColumnClasses(columns),
      noGutter ? null : 'tile-gutter',
      'tile-layout'
    );
    const props = mergeProps({className: classes}, others);
    return (
      <div {...props}>
        {children}
      </div>
    );
  }
}

class TileLayoutItem extends React.Component {
  render() {
    return (
      <div {...mergeProps({className: 'tile-item'}, this.props)}></div>
    );
  }
}

module.exports = {TileLayout, TileLayoutItem};
