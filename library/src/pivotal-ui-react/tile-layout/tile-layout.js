const React = require('react');
const classnames = require('classnames');
import {mergeProps} from 'pui-react-helpers';

/**
 * @component TileLayout
 * @description A responsive left to right wrapping layout with a set number of columns
 * where items will scale to fit their container
 *
 * @property columns {Number|Object} Number of columns or mapping from screen size to number of columns
 * @property noGutter {Boolean} Removes the gutter
 *
 * @example ```js
 * var TileLayout = require('pui-react-tile-layout').TileLayout;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <TileLayout columns={3}>
 *         <TileLayout.Item>
 *           An Item
 *         </TileLayout.Item>
 *         <TileLayout.Item>
 *           Another Item
 *         </TileLayout.Item>
 *         <TileLayout.Item>
 *           A third item
 *         </TileLayout.Item>
 *       </TileLayout>
 *     );
 *   }
 * });
 * ```
 *
 */
const TileLayout = React.createClass({
  propTypes: {
    columns: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object
    ]),
    noGutter: React.PropTypes.bool
  },
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
  },
  render() {
    const {children, columns, noGutter, ...others} = this.props;


    const classes = classnames(
      this.getColumnClasses(columns),
      noGutter ? null : 'tile-gutter',
      'tile-layout'
    );
    const props = mergeProps({className: classes}, ...others);
    return (
      <div {...props}>
        {children}
      </div>
    );
  }
});

/**
 * @component TileLayout.Item
 * @description Wrapper element for items in a tile layout
 *
 * @example ```js
 * var TileLayout = require('pui-react-tile-layout').TileLayout;
 *
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <TileLayout columns={3}>
 *         <TileLayout.Item>
 *           An Item
 *         </TileLayout.Item>
 *         <TileLayout.Item>
 *           Another Item
 *         </TileLayout.Item>
 *         <TileLayout.Item>
 *           A third item
 *         </TileLayout.Item>
 *       </TileLayout>
 *     );
 *   }
 * });
 * ```
 *
 */
TileLayout.Item = React.createClass({
  render() {
    return (
      <div {...mergeProps({className: 'tile-item'}, this.props)}></div>
    );
  }
});

export default TileLayout;
