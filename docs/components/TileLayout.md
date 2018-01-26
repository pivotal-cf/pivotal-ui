# Tile layout

## Examples

```jsx
::title=Basic example
<div>
  <TileLayout columns={3}>
    <TileLayoutItem>
      <DefaultButton>Hey</DefaultButton>
    </TileLayoutItem>
    <TileLayoutItem>
      <PrimaryButton>What</PrimaryButton>
    </TileLayoutItem>
    <TileLayoutItem>
      <DangerButton>Hello</DangerButton>
    </TileLayoutItem>
    <TileLayoutItem>
      <BrandButton>What</BrandButton>
    </TileLayoutItem>
  </TileLayout>
</div>
```

```jsx
::title=Responsive breakpoints
::description=You can also pass an object setting the number of columns for responsive breakpoints to the columns prop. You can set separate column values (from 1 - 12 columns) for some or all of xs, sm, md, lg, and xl screen sizes.
<div>
  <TileLayout columns={{xs: 1, sm: 2, md: 3}}>
    <TileLayoutItem>
      <DefaultButton>Hey</DefaultButton>
    </TileLayoutItem>
    <TileLayoutItem>
      <PrimaryButton>What</PrimaryButton>
    </TileLayoutItem>
    <TileLayoutItem>
      <DangerButton>Hello</DangerButton>
    </TileLayoutItem>
    <TileLayoutItem>
      <BrandButton>What</BrandButton>
    </TileLayoutItem>
  </TileLayout>
</div>
```

```jsx
::title=Gutters
::description=You can make a TileLayout without gutters by passing noGutter as a prop.
<div>
  <TileLayout noGutter columns={3}>
    <TileLayoutItem>
      <DefaultButton>Hey</DefaultButton>
    </TileLayoutItem>
    <TileLayoutItem>
      <PrimaryButton>What</PrimaryButton>
    </TileLayoutItem>
    <TileLayoutItem>
      <DangerButton>Hello</DangerButton>
    </TileLayoutItem>
  </TileLayout>
</div>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {TileLayout, TileLayoutItem} from 'pivotal-ui/react/tile-layout';`

#### CSS Only

`npm install pivotal-ui --save`

`import * as TileLayout from 'pivotal-ui/css/tile-layout';`

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
columns  | no | oneOf(Number, Object) |       | How many columns to display
noGutter | no | Boolean               | false | Whether to include a gutter or not
