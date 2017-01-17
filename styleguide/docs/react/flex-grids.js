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

Col Properties

There are none

## Basic usage

Import the subcomponents:

```
import {Grid, Col} from 'pui-react-flex-grids';
```

## Examples

```react_example
<div>
  <Grid>
    <Col><div style={{backgroundColor: 'red'}}>Column 1</div></Col>
    <Col><div style={{backgroundColor: 'green'}}>Column 2</div></Col>
    <Col><div style={{backgroundColor: 'blue'}}>Column 3</div></Col>
  </Grid>

 <Grid gutter={false}>
   <Col><div style={{backgroundColor: 'red'}}>Column 1</div></Col>
   <Col><div style={{backgroundColor: 'green'}}>Column 2</div></Col>
   <Col><div style={{backgroundColor: 'blue'}}>Column 3</div></Col>
 </Grid>
</div>
```

*/