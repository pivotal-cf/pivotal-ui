---
title: Grids
reactPath: pivotal-ui/react/flex-grids
cssPath: pivotal-ui/css/flex-grids
reactComponents:
- Grid
- FlexCol
---

Flex grids use flexbox to position columns within rows.

```jsx
//title=Outlining the grid
//description=This should help you visualize the columns. The grey dotted box is the grid and the orange dotted boxes are the columns.
<Grid className="grid-show show-outline">
  <FlexCol fixed {...{style: {width: '150px'}}}/>
  <FlexCol/>
  <FlexCol className="col-grow-2"/>
</Grid>;
```

```jsx
//title=Gutters
//description=You can create a flex grid with and without gutters. To remove gutters, set the `gutter` prop to `false` or use the `.grid-nogutter` class. Here are examples of what each would look like.
<div>
  <Grid className="grid-show mbxl">
    <FlexCol/>
    <FlexCol/>
    <FlexCol/>
  </Grid>
  <Grid gutter={false} className="grid-show">
    <FlexCol/>
    <FlexCol/>
    <FlexCol/>
  </Grid>
</div>;
```

```jsx
//title=Justify content within a grid
//description=Set the `justifyContent` prop on a `Grid` to control spacing around and between inner `FlexCol`s.
<div>
  <Grid className="grid-show mbxl" justifyContent="flex-end">
    <FlexCol fixed/>
    <FlexCol fixed/>
  </Grid>
  <Grid className="grid-show" justifyContent="center">
    <FlexCol fixed/>
    <FlexCol fixed/>
  </Grid>
  <Grid className="grid-show" justifyContent="space-between">
    <FlexCol fixed/>
    <FlexCol fixed/>
  </Grid>
</div>;
```

```jsx
//title=Sizing
//description=Using the `col` prop on a `FlexCol` or the `col-{n}` classes, you can create a basic grid system by specifying the width of each column out of 24.
<div>
  <Grid className="grid-show mbxl">
    <FlexCol col={2}/>
    <FlexCol col={2}/>
    <FlexCol col={2}/>
    <FlexCol col={2}/>
    <FlexCol col={2}/>
    <FlexCol col={2}/>
    <FlexCol col={2}/>
    <FlexCol col={2}/>
    <FlexCol col={2}/>
    <FlexCol col={2}/>
    <FlexCol col={2}/>
    <FlexCol col={2}/>
  </Grid>

  <Grid className="grid-show mbxl">
    <FlexCol col={16}/>
    <FlexCol col={8}/>
  </Grid>

  <Grid className="grid-show mbxl">
    <FlexCol col={8}/>
    <FlexCol col={8}/>
    <FlexCol col={8}/>
  </Grid>

  <Grid className="grid-show">
    <FlexCol col={12}/>
    <FlexCol col={12}/>
  </Grid>
</div>;
```

```jsx
//title=Dynamic column growth
//description=You can also specify how the columns grow with the `grow={n}` prop or the `col-grow-{n}` classes (n = 2 - 11). These columns will attempt to respect their given ratio until the content of the column exceeds their parameters, after which the column will drop onto another row:
<div>
  <Grid className="grid-show mbxl">
    <FlexCol/>
    <FlexCol grow={2}/>
  </Grid>

  <Grid className="grid-show">
    <FlexCol/>
    <FlexCol grow={2}/>
    <FlexCol grow={5}/>
  </Grid>
</div>;
```

```jsx
//title=Fixing column sizing
//description=You can fix the width of a column by using the `fixed` prop or the `.col-fixed` class.
<Grid className="grid-show">
  <FlexCol fixed {...{style: {width: '150px'}}}/>
  <FlexCol/>
  <FlexCol/>
</Grid>;
```

```jsx
//title=Breakpoints
//description=You can specify three different media breakpoints with the `breakpoint` prop or the `.col-sm, .col-md, and .col-lg` classes.
<div>
  <Grid className="grid-show mbxl">
    <FlexCol {...{style: {width: '150px'}, breakpoint: 'sm'}}/>
    <FlexCol {...{breakpoint: 'sm'}}/>
    <FlexCol {...{breakpoint: 'sm'}}/>
  </Grid>
  <Grid className="grid-show mbxl">
    <FlexCol {...{style: {width: '150px'}, breakpoint: 'md'}}/>
    <FlexCol {...{breakpoint: 'md'}}/>
    <FlexCol {...{breakpoint: 'md'}}/>
  </Grid>
   <Grid className="grid-show">
     <FlexCol {...{style: {width: '150px'}, breakpoint: 'lg'}}/>
     <FlexCol {...{breakpoint: 'lg'}}/>
     <FlexCol {...{breakpoint: 'lg'}}/>
   </Grid>
</div>;
```

```jsx
//title=Alignment
//description=Aligning columns relative to the grid:
<Grid className="grid-show" {...{style: {height: '200px'}}}>
  <FlexCol {...{alignment: 'top'}}/>
  <FlexCol {...{alignment: 'middle'}}/>
  <FlexCol {...{alignment: 'bottom'}}/>
</Grid>;
```

```jsx
//title=Relative alignment
//description=Aligning content relative to the column it is in
<Grid>
  <FlexCol {...{contentAlignment: 'top', style: {height: '100px', border: '1px solid #b4b4b4', background: '#f8f8f8', margin: '0 8px'}}}>Some content that sits at the top of the column</FlexCol>
  <FlexCol {...{contentAlignment: 'middle', style: {height: '100px', border: '1px solid #b4b4b4', background: '#f8f8f8', margin: '0 8px'}}}>Some content that sits in the middle of the column</FlexCol>
  <FlexCol {...{contentAlignment: 'bottom', style: {height: '100px', border: '1px solid #b4b4b4', background: '#f8f8f8', margin: '0 8px'}}}>Some content that sits at the bottom of the column</FlexCol>
</Grid>;
```

## Props

### Grid props

| Property          | Required   | Type                                                                                         | Default   | Description                                |
| ----------------- | ---------- | ---------                                                                                    | --------- | ------------                               |
| `gutter`          | no         | boolean                                                                                      | true      | When true, adds spacing between `FlexCol`s |
| `flexDirection`   | no         | oneOf(['row', 'row-reverse', 'column', 'column-reverse'])                                    |           | Sets the flex direction                    |
| `justifyContent`  | no         | oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']) |           | Sets the `justify-content` CSS property    |

### FlexCol props

Property           | Required | Type                               | Default | Description
-------------------|----------|------------------------------------|---------|------------
`alignment`        | no       | oneOf(['top', 'middle', 'bottom']) |         | Alignment of the column within the `Grid`
`breakpoint`       | no       | oneOf(['sm', 'md', 'lg'])          |         | Width of window at which column will expand to take up full width of `Grid` (`sm` = `768px`, `md` = `992px`, `lg` = `1200px`)
`col`              | no       | number                             |         | Fraction out of 24 that this column's width should be in its `Grid`
`contentAlignment` | no       | oneOf(['top', 'middle', 'bottom']) |         | Alignment of the column's contents within itself
`fixed`            | no       | boolean                            | false   | When true, column width is fixed to the width of its content
`grow`             | no       | number                             | 1       | The ratio of the column's width relative to other columns in the same `Grid`
