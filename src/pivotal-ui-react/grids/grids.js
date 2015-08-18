var React = require('react');
var types = React.PropTypes;
var BootstrapRow = require('react-bootstrap').Row;
import {mergeProps} from 'pui-react-helpers';

/**
 * @component Row
 * @description Denotes a container of grid columns for the Pivotal UI 24-column mobile-first grid system
 *
 * @property gutter {String} Sets the spacing between columns (either `sm`, `md`, or `lg`).
 *
 * @example ```js
 * var Row = require('pui-react-grids').Row;
 * var Col = require('pui-react-grids').Col;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <Row>
 *         <Col xs={24} md={16}></Col>
 *         <Col xs={12} md={8}></Col>
 *       </Row>
 *       <Row>
 *         <Col xs={12} md={8}></Col>
 *         <Col xs={12} md={8}></Col>
 *         <Col xs={12} md={8}></Col>
 *       </Row>
 *       <Row>
 *         <Col xs={12}></Col>
 *         <Col xs={12}></Col>
 *       </Row>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#grid_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/layout.html#grid)
 */
var Row = React.createClass({
  propTypes: {
    gutter: types.oneOf(['sm', 'md', 'lg'])
  },

  render() {
    const {gutter, children, ...other} = this.props;
    const gutterClass = {
      'row-gutter-md': gutter === 'md',
      'row-gutter-sm': gutter === 'sm'
    };
    const props = mergeProps(other, {className: gutterClass});
    return (<BootstrapRow {...props}>{children}</BootstrapRow>);
  }
});

/**
 * @component Col
 * @description Denotes a column within a row of the Pivotal UI grid system
 *
 * @property xs {Number} The width of the column (1-24) in extra small devices (<= 768px)
 * @property sm {Number} The width of the column (1-24) in small devices (> 768px)
 * @property md {Number} The width of the column (1-24) in medium devices (> 992px)
 * @property lg {Number} The width of the column (1-24) in large devices (> 992px)
 *
 * @property xsOffset {Number} The number of column-widths to use as left margin in extra small devices
 * @property smOffset {Number} The number of column-widths to use as left margin in small devices
 * @property mdOffset {Number} The number of column-widths to use as left margin in medium devices
 * @property lgOffset {Number} The number of column-widths to use as left margin in large devices
 *
 * @property xsPush {Number} Move this column to the right by the given number of column-widths in extra small devices
 * @property smPush {Number} Move this column to the right by the given number of column-widths in small devices
 * @property mdPush {Number} Move this column to the right by the given number of column-widths in medium devices
 * @property lgPush {Number} Move this column to the right by the given number of column-widths in large devices
 *
 * @property xsPull {Number} Move this column to the left by the given number of column-widths in extra small devices
 * @property smPull {Number} Move this column to the left by the given number of column-widths in small devices
 * @property mdPull {Number} Move this column to the left by the given number of column-widths in medium devices
 * @property lgPull {Number} Move this column to the left by the given number of column-widths in large devices
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#grid_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/layout.html#grid)
 */
var Col = require('react-bootstrap').Col;

module.exports = {Row, Col};


/*doc
---
title: Grids
name: grid_react
category:
- React
---


<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-grids --save
</i>
</code>

Require the subcomponent:

```
var Row = require('pui-react-grids').Row;
```



The react grids depend on [React-Bootstrap](http://react-bootstrap.github.io/components.html#grids). Check out their docs
for advanced stuff like pushing, pulling, and offsets.

*/

/*doc
---
title: Examples
name: 04_grid_examples_react
parent: grid_react
---


```react_example
<div>
  <Row className="grid-show">
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
  </Row>

  <Row className="grid-show">
    <Col md={16}></Col>
    <Col md={8}></Col>
  </Row>

  <Row className="grid-show">
    <Col md={8}></Col>
    <Col md={8}></Col>
    <Col md={8}></Col>
  </Row>

  <Row className="grid-show">
    <Col md={12}></Col>
    <Col md={12}></Col>
  </Row>
</div>
 ```
 */

/*doc
---
title: "Example: Mobile and Desktop"
name: 04_a_grid_mobile_and_desktop_react
parent: 04_grid_examples_react
---
Don't want your columns to simply stack in smaller devices?
Use the extra small and medium device grid classes by adding `.col-xs-*` `.col-md-*` to your columns.
See the example below for a better idea of how it all works.
```react_example
<div>
 <Row className="grid-show">
  <Col xs={24} md={16}></Col>
  <Col xs={12} md={8}></Col>
 </Row>
 <Row className="grid-show">
  <Col xs={12} md={8}></Col>
  <Col xs={12} md={8}></Col>
  <Col xs={12} md={8}></Col>
 </Row>
 <Row className="grid-show">
  <Col xs={12}></Col>
  <Col xs={12}></Col>
 </Row>
</div>
```
 */

/*doc
---
title: Gutter Sizes
name: 04_grid_gutter_sizes_react
parent: grid_react
---
```react_example
<div>
 <Row className="grid-show">
  <Col md={12}></Col>
  <Col md={12}></Col>
 </Row>
 <Row className="grid-show" gutter="md">
  <Col md={12}></Col>
  <Col md={12}></Col>
 </Row>
 <Row className="grid-show" gutter="sm">
  <Col md={12}></Col>
  <Col md={12}></Col>
 </Row>
</div>
```
*/
