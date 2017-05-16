/*doc
---
title: Flex Grids
name: flex_grid_react
categories:
- react_utilities_grids
- react_all
parent: grid_react
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-flex-grids --save
</code>

## Props

Grid properties:

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
gutter | no | bool | true | Whether to include a gutter between columns or not

FlexCol properties:

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
 percentage | no | number | | The proportion of the 24-pt grid you want this column to occupy
 fixed | no | bool | | Causes the column to be fixed width
 grow | no | number | | How much extra space to occupy, compared to default width
 alignment | no | oneOf('top', 'middle', 'bottom') | | The vertical alignment of the col within the row
 contentAlignment | no | oneOf('top', 'middle', 'bottom') | | The vertical alignment of the content within the col
 breakpoint | no | oneOf('sm', 'md', 'lg') | | At which screen size content should wrap onto next line

## Basic usage

Import the subcomponents:

```
import {Grid, FlexCol} from 'pui-react-flex-grids';
```

## Examples

```react_example
<div>
  <Grid className="grid-show">
    <FlexCol></FlexCol>
    <FlexCol></FlexCol>
    <FlexCol></FlexCol>
  </Grid>

 <Grid className="grid-show" gutter={false}>
   <FlexCol></FlexCol>
   <FlexCol></FlexCol>
   <FlexCol></FlexCol>
 </Grid>
</div>
```

### Sizing

 Using a single set of `.col-n` grid classes, you can create a basic grid system that starts
 out stacked on mobile devices and tablet devices (the extra small to small range) before
 becoming horizontal on desktop (medium) devices. Place grid columns in any `.grid`:

 ```react_example
<div>
  <Grid className="grid-show">
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
    <FlexCol percentage={2}></FlexCol>
  </Grid>

  <Grid className="grid-show">
    <FlexCol percentage={16}></FlexCol>
    <FlexCol percentage={8}></FlexCol>
  </Grid>

  <Grid className="grid-show">
    <FlexCol percentage={8}></FlexCol>
    <FlexCol percentage={8}></FlexCol>
    <FlexCol percentage={8}></FlexCol>
  </Grid>

  <Grid className="grid-show">
    <FlexCol percentage={12}></FlexCol>
    <FlexCol percentage={12}></FlexCol>
  </Grid>
</div>
 ```

 You can also specify how the columns grow with `.col-grow-n` (n = 2 - 11). These columns will
 attempt to respect their given ratio until the content of the column exceeds their parameters,
 after which the column will drop onto another row:

 ```react_example
<div>
  <Grid className="grid-show">
    <FlexCol></FlexCol>
    <FlexCol grow={2}></FlexCol>
  </Grid>

  <Grid className="grid-show">
    <FlexCol></FlexCol>
    <FlexCol grow={2}></FlexCol>
    <FlexCol grow={5}></FlexCol>
  </Grid>
</div>
 ```

### Fixing Column Size

 You can fix the width of a column by using the `.col-fixed` class.

 ```react_example
<Grid className="grid-show">
  <FlexCol fixed={true} style="width: 150px;"></FlexCol>
  <FlexCol></FlexCol>
  <FlexCol></FlexCol>
</Grid>
 ```

### Break Points

 You can specify three different media breakpoints with the `.col-sm, .col-md, and .col-lg` classes.

 ```react_example
<div>
  <Grid className="grid-show">
    <FlexCol breakpoint="sm" style="width: 150px;"></FlexCol>
    <FlexCol breakpoint="sm"></FlexCol>
    <FlexCol breakpoint="sm"></FlexCol>
  </Grid>

  <Grid className="grid-show">
    <FlexCol breakpoint="md" style="width: 150px;"></FlexCol>
    <FlexCol breakpoint="md"></FlexCol>
    <FlexCol breakpoint="md"></FlexCol>
  </Grid>

  <Grid className="grid-show">
    <FlexCol breakpoint="lg" style="width: 150px;"></FlexCol>
    <FlexCol breakpoint="lg"></FlexCol>
    <FlexCol breakpoint="lg"></FlexCol>
  </Grid>
</div>
 ```

### Alignment

 Aligning columns relative to the grid:

 ```react_example
<Grid className="grid-show" style={{height: '200px'}}>
  <FlexCol alignment="top"></FlexCol>
  <FlexCol alignment="middle"></FlexCol>
  <FlexCol alignment="bottom"></FlexCol>
</Grid>
 ```

 Aligning content relative to the column it is in:

 ```react_example
<Grid>
  <FlexCol contentAlignment="top" style={{height: '100px', border: '1px solid gray'}}>Some content that sits at the top of the column</FlexCol>
  <FlexCol contentAlignment="middle" style={{height: '100px', border: '1px solid gray'}}>Some content that sits in the middle of the column</FlexCol>
  <FlexCol contentAlignment="bottom" style={{height: '100px', border: '1px solid gray'}}>Some content that sits at the bottom of the column</FlexCol>
</Grid>
 ```

*/