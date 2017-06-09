# Dividers

## Description

## Basic Usage

Import the subcomponents:

```
import {Divider} from 'pui-react-dividers';
```

Dividers draw horizontal lines between different content groupings.

```jsx
::title=Large Divider Example
<div>
  <Divider />
  <Divider size="large" />
</div>
```

On a dark background, use these inverse dividers:

```jsx
::title=Inverse Dividers
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
