/*doc
---
title: Grids
name: grid_react
categories:
 - react_utilities_grids
 - react_all
---


<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-grids --save
</i>
</code>

Require the subcomponents:

```
var Row = require('pui-react-grids').Row;
var Col = require('pui-react-grids').Col;
```

## Row Properties

 Property           |  Type         | Description
 -------------      | --------------| --------------------------------------------------------------------------
 `componentClass`       | String or Component class  | The component to render the row. Defaults to "div"
 `gutter` | one of: `"sm"`, `"md"`, `"lg"` | sets the size of the gutter. Defaults to "lg"


## Col Properties

 Property           |  Type         | Description
 -------------      | --------------| --------------------------------------------------------------------------
 `componentClass`       | String or Component class  | The component to render the row. Defaults to "div"
 `xs`, `sm`, `md`, `lg` | Number | Width of the column (out of 24) at the xs, sm, md, or lg screen width.
 `xsHidden`, `smHidden`, `mdHidden`, `lgHidden` | Boolean | If true, hide the column at the relevant screen width
 `xsOffset`, `smOffset`, `mdOffset`, `lgOffset` | Number | Offset of the column (out of 24)
 `xsPush`, `smPush`, `mdPush`, `lgPush` | Number | Offset to change the order of grid columns to the right with
 `xsPull`, `smPull`, `mdPull`, `lgPull` | Number | Offset to change the order of grid columns to the left with

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
