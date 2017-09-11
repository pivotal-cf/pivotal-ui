# Grids

## Subcomponents

- [Flex Grids](#flex-grids)
- [Bootstrap Grids](#bootstrap-grids)

# Flex Grids

## Description

TODO: Use the `.grid` class to wrap columns to create a flex grid.

## Examples

```html
::title=Gutters
::description=You can create a flex grid with and without gutters. Here are examples of what each would look like.
<div class="grid grid-show">
  <div class="col"></div>
  <div class="col"></div>
  <div class="col"></div>
</div>

<div class="grid grid-nogutter grid-show">
  <div class="col"></div>
  <div class="col"></div>
  <div class="col"></div>
</div>
```

```html
::title=Sizing
::description=Using a single set of `.col-n` grid classes, you can create a basic grid system that starts out stacked on mobile devices and tablet devices (the extra small to small range) before becoming horizontal on desktop (medium) devices. Place grid columns in any `.grid`:
<div class="grid grid-show">
  <div class="col col-2"></div>
  <div class="col col-2"></div>
  <div class="col col-2"></div>
  <div class="col col-2"></div>
  <div class="col col-2"></div>
  <div class="col col-2"></div>
  <div class="col col-2"></div>
  <div class="col col-2"></div>
  <div class="col col-2"></div>
  <div class="col col-2"></div>
  <div class="col col-2"></div>
  <div class="col col-2"></div>
</div>

<div class="grid grid-show">
  <div class="col col-16"></div>
  <div class="col col-8"></div>
</div>

<div class="grid grid-show">
  <div class="col col-8"></div>
  <div class="col col-8"></div>
  <div class="col col-8"></div>
</div>

<div class="grid grid-show">
  <div class="col col-12"></div>
  <div class="col col-12"></div>
</div>
```

```html
::title=Dynamic column growth
::description=You can also specify how the columns grow with `.col-grow-n` (n = 2 - 11). These columns will attempt to respect their given ratio until the content of the column exceeds their parameters, after which the column will drop onto another row:
<div class="grid grid-show">
  <div class="col"></div>
  <div class="col col-grow-2"></div>
</div>

<div class="grid grid-show">
  <div class="col"></div>
  <div class="col col-grow-2"></div>
  <div class="col col-grow-5"></div>
</div>
```

```html
::title=Fixing column sizing
::description=You can fix the width of a column by using the `.col-fixed` class.
<div class="grid grid-show">
  <div class="col col-fixed" style="width: 150px;"></div>
  <div class="col"></div>
  <div class="col"></div>
</div>
```

```html
::title=Breakpoints
::description=You can specify three different media breakpoints with the `.col-sm, .col-md, and .col-lg` classes.
<div class="grid grid-show">
  <div class="col col-sm" style="width: 150px;"></div>
  <div class="col col-sm"></div>
  <div class="col col-sm"></div>
</div>

<div class="grid grid-show">
  <div class="col col-md" style="width: 150px;"></div>
  <div class="col col-md"></div>
  <div class="col col-md"></div>
</div>

<div class="grid grid-show">
  <div class="col col-lg" style="width: 150px;"></div>
  <div class="col col-lg"></div>
  <div class="col col-lg"></div>
</div>
```

```html
::title=Alignment
::description=Aligning columns relative to the grid:
<div class="grid grid-show" style="height:200px">
  <div class="col col-align-top"></div>
  <div class="col col-align-middle"></div>
  <div class="col col-align-bottom"></div>
</div>
```

```html
::title=Relative alignment
::description=Aligning content relative to the column it is in
<div class="grid">
  <div class="col col-top" style="height:100px; border: 1px solid #b4b4b4; background: #f8f8f8; margin: 0 8px;">Some content that sits at the top of the column</div>
  <div class="col col-middle" style="height:100px; border: 1px solid #b4b4b4; background: #f8f8f8; margin: 0 8px;">Some content that sits in the middle of the column</div>
  <div class="col col-bottom" style="height:100px; border: 1px solid #b4b4b4; background: #f8f8f8; margin: 0 8px;">Some content that sits at the bottom of the column</div>
</div>
```

# Bootstrap Grids

## Description

Pivotal ui (via bootstrap) includes a responsive, **mobile first** fluid grid system that
appropriately scales up to 24 columns as the device or viewport size increases.
To work with the system, you need to **treat mobile as your default**
and build more complex layouts up from there.

### Introduction

Grid systems are used for creating page layouts through a series of rows and columns that house your content.
Here's how the bootstrap grid system works:

* Rows must be placed within a `.container` for proper alignment and padding.

* Use `.row` to create horizontal groups of columns.

* Content should be placed within columns (e.g. `.col-sm-11`, `.col-lg-6`, etc.).
Only columns may be immediate children of rows.

Columns are defined by two properties:
the breakpoint at which they start acting like columns,
and their relative width (on a scale of 24) beginning at this breakpoint.
For example:

* A column with the class `.col-sm-11` will take up 100% of the container
for devices with screen-width &lt; 768px (the extra small breakpoint),
and 11/24ths for devices &geq; 768px.

* A column with the class `.col-lg-6` will take up 100% of the container
for devices with &lt; 1200px,
and 1/4th (6/24ths) for devices &geq; 1200px.

* 3 `.col-md-8` columns would fill a row for devices &geq; 992px.
They would each take up their own row on devices &lt; 992px.

* Use the `.col-xs-*` classes to use a grid on mobile.

Look to the examples for applying these principles to your code.

### Media Queries

We use the following media queries in our sass files to create the key breakpoints in our grid system.

Name      |   Size         | Variable Name
--------- | -------------- | ------------------
mobile    |                | no media query since this is the default in bootstrap
x-small   | 480px          | `$screen-xs-min`
small     | 768px          | `$screen-sm-min`
medium    | 992px          | `$screen-md-min`
large     | 1200px         | `$screen-lg-min`
x-large   | 1800px         | `$screen-xl-min`

## Examples

```html
::title=Grid sizes
::description=See how aspects of the bootstrap grid system work across multiple devices with a handy table.
<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th></th>
      <th>
        extra small devices
        <small>phones (&leq;768px)</small>
      </th>
      <th>
        small devices
        <small>tablets (&gt;768px)</small>
      </th>
      <th>
        medium devices
        <small>laptops (&gt;992px)</small>
      </th>
      <th>
        large devices
        <small>desktops (&gt;1200px)</small>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class="text-nowrap">grid behavior</th>
      <td>horizontal at all times</td>
      <td colspan="3">collapsed to start, horizontal above breakpoints</td>
    </tr>
    <tr>
      <th class="text-nowrap">container width</th>
      <td>none (auto)</td>
      <td>750px</td>
      <td>970px</td>
      <td>1170px</td>
    </tr>
    <tr>
      <th class="text-nowrap">class prefix</th>
      <td><code>.col-xs-</code></td>
      <td><code>.col-sm-</code></td>
      <td><code>.col-md-</code></td>
      <td><code>.col-lg-</code></td>
    </tr>
    <tr>
      <th class="text-nowrap"># of columns</th>
      <td colspan="4">24</td>
    </tr>
    <tr>
      <th class="text-nowrap">column width</th>
      <td>auto</td>
      <td>~62px</td>
      <td>~81px</td>
      <td>~97px</td>
    </tr>
    <tr>
      <th class="text-nowrap">gutter width</th>
      <td colspan="4">30px (15px on each side of a column)</td>
    </tr>
    <tr>
      <th class="text-nowrap">nestable</th>
      <td colspan="4">yes</td>
    </tr>
    <tr>
      <th class="text-nowrap">offsets</th>
      <td colspan="4">yes</td>
    </tr>
    <tr>
      <th class="text-nowrap">column ordering</th>
      <td colspan="4">yes</td>
    </tr>
  </tbody>
</table>
```

```jsx
::title=Basic example
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

```jsx
::title=Mobile and Desktop
::description=Don't want your columns to simply stack in smaller devices? Use the extra small and medium device grid classes by adding `.col-xs-*` `.col-md-*` to your columns. See the example below for a better idea of how it all works.
<div>
  <Row className="grid-show">
    <Col xs={24} md={16}/>
    <Col xs={12} md={8}/>
  </Row>
  <Row className="grid-show">
    <Col xs={12} md={8}/>
    <Col xs={12} md={8}/>
    <Col xs={12} md={8}/>
  </Row>
  <Row className="grid-show">
    <Col xs={12}/>
    <Col xs={12}/>
  </Row>
</div>
```

```jsx
::title=Gutter sizes
<div>
  <Row className="grid-show">
    <Col md={12}/>
    <Col md={12}/>
  </Row>
  <Row className="grid-show" gutter="md">
    <Col md={12}/>
    <Col md={12}/>
  </Row>
  <Row className="grid-show" gutter="sm">
    <Col md={12}/>
    <Col md={12}/>
  </Row>
</div>
```

```html
::title=Responsive column resets
::description=With the four tiers of grids available you're bound to run into issues where, at certain breakpoints, your columns don't clear quite right as one is taller than the other. To fix that, use a combination of a `.clearfix` and our responsive utility classes.
<div class="row grid-show">
  <div class="col-xs-12 col-sm-6" grid-content="this is a tall column"></div>
  <div class="col-xs-12 col-sm-6"></div>

  <!-- add the extra clearfix for only the required viewport -->
  <div class="clearfix visible-xs-block"></div>

  <div class="col-xs-12 col-sm-6"></div>
  <div class="col-xs-12 col-sm-6"></div>
</div>
```

```html
::title=Offsetting columns
::description=Move columns to the right using `.col-md-offset-*` classes. These classes increase the left margin of a column by `*` columns. For example, `.col-md-offset-4` moves `.col-md-4` over four columns.
<div class="row grid-show">
  <div class="col-md-8"></div>
  <div class="col-md-8 col-md-offset-8"></div>
</div>
<div class="row grid-show">
  <div class="col-md-6 col-md-offset-6"></div>
  <div class="col-md-6 col-md-offset-6"></div>
</div>
<div class="row grid-show">
  <div class="col-md-12 col-md-offset-6"></div>
</div>
```

```html
::title=Column Ordering
::description=Easily change the order of our built-in grid columns with `.col-md-push-*` and `.col-md-pull-*` modifier classes. This is useful if you want to change the order of columns at different screen sizes.
<div class="row grid-show">
  <div class="col-md-18 col-md-push-6"></div>
  <div class="col-md-6 col-md-pull-18"></div>
</div>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {Row, Col} from 'pivotal-ui/react/grids';`

#### CSS Only
`npm install pivotal-ui --save`

`import * as Grids from 'pivotal-ui/css/grids';`

## Props

Row properties:

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
componentClass | no | Node                    | div  | The component to render the row
gutter         | no | oneOf('sm', 'md', 'lg') | 'lg' | Sets the size of the gutter

Col Properties

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
componentClass                         | no | Node    | div | The component to render the row
xs, sm, md, lg                         | no | Number  |     | Width of the column (out of 24) at the xs, sm, md, or lg screen width
xsHidden, smHidden, mdHidden, lgHidden | no | Boolean |     | If true, hide the column at the relevant screen width
xsOffset, smOffset, mdOffset, lgOffset | no | Number  |     | Offset of the column (out of 24)
xsPush, smPush, mdPush, lgPush         | no | Number  |     | Offset to change the order of grid columns to the right with
xsPull, smPull, mdPull, lgPull         | no | Number  |     | Offset to change the order of grid columns to the left with