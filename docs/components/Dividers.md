---
title: Dividers
cssPath: pivotal-ui/css/dividers
reactPath: pivotal-ui/react/dividers
reactComponents:
  - Divider
---

## Examples

```jsx
::title=Large divider example
::description=Dividers draw horizontal lines between different content groupings
<div>
  <Divider />
  Content
  <Divider size="large" />
</div>
```

```jsx
::title=Inverse dividers
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
## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {Divider} from 'pivotal-ui/react/dividers';`

#### CSS Only
`npm install pivotal-ui --save`

`import 'pivotal-ui/css/dividers';`

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
inverse | no | Boolean        | | Specifying this prop inverses the divider
size    | no | String | | Changes the size of the component. Either 'large' or leave undefined for default size.
