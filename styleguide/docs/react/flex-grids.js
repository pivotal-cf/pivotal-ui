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

FlexCol Properties

There are none

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

*/