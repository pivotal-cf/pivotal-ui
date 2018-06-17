---
title: Dividers
menu: components
cssPath: pivotal-ui/css/dividers
reactPath: pivotal-ui/react/dividers
componentProps:
  Divider:
    inverse: Inverts the colors of the divider
    size: Changes the size of the component. Either 'large' or leave undefined for default size.
---

# Overview

# Examples

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
