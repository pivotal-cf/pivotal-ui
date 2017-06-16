# Tile Layout

## Installation & Usage

#### React
`npm install pui-react-tile-layout pui-react-panels --save`

#### CSS Only
`npm install pui-css-tile-layout pui-css-panels --save`

## Basic usage

Import the subcomponents:

```
import {TileLayout, TileLayoutItem} from 'pui-react-tile-layout';

// for the example
import {ClickableAltPanel} from 'pui-react-panels';
```

```jsx
::title=Basic Example
<div>
  <TileLayout columns={3}>
    <TileLayoutItem>
      <ClickableAltPanel>Hey</ClickableAltPanel>
    </TileLayoutItem>
    <TileLayoutItem>
      <ClickableAltPanel>What</ClickableAltPanel>
    </TileLayoutItem>
    <TileLayoutItem>
      <ClickableAltPanel>Hello</ClickableAltPanel>
    </TileLayoutItem>
    <TileLayoutItem>
      <ClickableAltPanel>What</ClickableAltPanel>
    </TileLayoutItem>
  </TileLayout>
</div>
```
## Responsive Breakpoints

You can also pass an object setting the number of columns for responsive
breakpoints to the columns prop. You can set separate column values
(from 1 - 12 columns) for some or all of xs, sm, md, lg, and xl screen sizes.

```jsx
::title=Breakpoints Example
<div>
  <TileLayout columns={{xs: 1, sm: 2, md: 3}}>
    <TileLayoutItem>
      <ClickableAltPanel>Hey</ClickableAltPanel>
    </TileLayoutItem>
    <TileLayoutItem>
      <ClickableAltPanel>What</ClickableAltPanel>
    </TileLayoutItem>
    <TileLayoutItem>
      <ClickableAltPanel>Hello</ClickableAltPanel>
    </TileLayoutItem>
    <TileLayoutItem>
      <ClickableAltPanel>What</ClickableAltPanel>
    </TileLayoutItem>
  </TileLayout>
</div>
```

## Gutters

You can make a TileLayout without gutters by passing noGutter as a prop.

```jsx
::title=Gutter Example
<div>
  <TileLayout noGutter columns={3}>
    <TileLayoutItem>
      <ClickableAltPanel>Hey</ClickableAltPanel>
    </TileLayoutItem>
    <TileLayoutItem>
      <ClickableAltPanel>What</ClickableAltPanel>
    </TileLayoutItem>
    <TileLayoutItem>
      <ClickableAltPanel>Hello</ClickableAltPanel>
    </TileLayoutItem>
  </TileLayout>
</div>
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
columns  | no | oneOf(Number, Object) |       | How many columns to display
noGutter | no | Boolean               | false | Whether to include a gutter or not
