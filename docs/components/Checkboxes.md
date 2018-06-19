---
title: Checkbox
menu: components
cssPath: pivotal-ui/css/checkbox
reactPath: pivotal-ui/react/checkbox
reactComponents:
  - Checkbox
---

# Overview

# Examples

```jsx
::title=Checkboxes
<div>
  <Checkbox>Checkbox one</Checkbox>
  <Checkbox disabled>Checkbox two (disabled)</Checkbox>
  <Checkbox indeterminate>Checkbox three (indeterminate)</Checkbox>
</div>
```

# Props

Property         | Required | Type    | Default | Description
-----------------|----------|---------|---------|------------
`checked`        | false    | boolean |         | Whether the checkbox is checked, when controlled
`children`       | false    | node    |         | Content to place within `label` to the right of the checkbox
`className`      | false    | string  |         | Class name to put on outer `div` element
`disabled`       | false    | boolean |         | Whether the checkbox is disabled
`defaultChecked` | false    | boolean |         | Whether the checkbox is checked, when uncontrolled
`id`             | false    | string  | Auto-generated unique ID with prefix "checkbox" | ID to put on the inner `input[type="checkbox"]`
`indeterminate`  | false    | boolean |         | Puts checkbox into an indeterminate state
`labelClassName` | false    | string  |         | Class name to put on the checkbox label
`name`           | false    | string  |         | Name to set on inner `input[type="checkbox"]`
`onChange`       | false    | func    |         | onChange callback to set on inner `input[type="checkbox"]`
`style`          | false    | object  |         | Style to put on outer `div` element

All other props will be put onto the inner `input[type="checkbox"]`.