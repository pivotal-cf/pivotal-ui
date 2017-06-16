# Dividers

## Installation & Usage

#### React
`npm install pui-react-dividers --save`

#### CSS Only
`npm install pui-css-dividers --save`

## Description

Import the subcomponents:

```
import {Divider} from 'pui-react-dividers';
```

## Examples

```jsx
::title=Large Divider Example
::description=Dividers draw horizontal lines between different content groupings
<div>
  <Divider />
  <Divider size="large" />
</div>
```

```jsx
::title=Inverse Dividers
::description=On a dark background, use these inverse dividers
<div style={{background: '#232B2F'}}>
  <div className="type-dark-11">
    I am some content
    <Divider inverse />
    Me too
  </div>
  
  <div className="type-dark-11">
    Here's some stuff above the divider
    <Divider inverse size="large" />
    Here's some stuff below the divider
  </div>
</div>
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
inverse | no | Boolean        | | Specifying this prop inverses the divider
size    | no | oneOf('large') | | Changes the size of the component
