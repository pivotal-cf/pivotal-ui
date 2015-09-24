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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_all_tile-layout.html)
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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_all_tile-layout.html)
 */
TileLayout.Item = React.createClass({
  render() {
    return (
      <div {...mergeProps({className: 'tile-item'}, this.props)}></div>
    );
  }
});

export default TileLayout;

/*doc
 ---
 title: Tile Layout
 name: tile_layout_react
 categories:
 - react_utilities_tile-layout
 - react_all
 ---

 <code class="pam">
 <i class="fa fa-download" alt="Install the Component">
 npm install pui-react-tile-layout --save
 </i>
 </code>

 Require the component:

 ```
 var TileLayout = require('pui-react-tile-layout');
 var ClickableAltPanel = require('pui-react-tile-layout').ClickableAltPanel;
 ```

 For the example, you also need to require `ClickableAltPanel` from [Panels](#panel_react).


 ```react_example
 <TileLayout columns={3}>
   <TileLayout.Item>
     <ClickableAltPanel>Hey</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>Hello</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayout.Item>
 </TileLayout>
 ```
*/

/*doc
 ---
 title: Responsive Breakpoints
 name: 01_tile_layout_responsive
 parent: tile_layout_react
 ---

 You can also pass an object setting the number of columns for responsive
 breakpoints to the columns prop. You can set separate column values
 (from 1 - 12 columns) for some or all of xs, sm, md, lg, and xl screen sizes.

 ```react_example
 <TileLayout columns={{xs: 1, sm: 2, md: 3}}>
   <TileLayout.Item>
     <ClickableAltPanel>Hey</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>Hello</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayout.Item>
 </TileLayout>
 ```

*/

/*doc
 ---
 title: Gutters
 name: 02_tile_layout_gutters
 parent: tile_layout_react
 ---

  You can make a TileLayout without gutters by passing noGutter as a prop.

 ```react_example
 <TileLayout noGutter columns={3}>
 <TileLayout.Item>
 <ClickableAltPanel>Hey</ClickableAltPanel>
 </TileLayout.Item>
 <TileLayout.Item>
 <ClickableAltPanel>What</ClickableAltPanel>
 </TileLayout.Item>
 <TileLayout.Item>
 <ClickableAltPanel>Hello</ClickableAltPanel>
 </TileLayout.Item>
 </TileLayout>
 ```

 */
