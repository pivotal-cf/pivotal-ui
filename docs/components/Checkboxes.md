---
title: Checkbox
menu: components
cssPath: pivotal-ui/css/checkbox
reactPath: pivotal-ui/react/checkbox
componentProps:
  Checkbox:
    checked: Whether the checkbox is checked, when controlled
    children: Content to place within `label` to the right of the checkbox
    className: Class name to put on outer `div` element
    disabled: Whether the checkbox is disabled
    defaultChecked: Whether the checkbox is checked, when uncontrolled
    id: ID to put on the inner `input[type="checkbox"]`
    indeterminate: Puts checkbox into an indeterminate state
    labelClassName: Class name to put on the checkbox label
    name: Name to set on inner `input[type="checkbox"]`
    onChange: onChange callback to set on inner `input[type="checkbox"]`
    style: Style to put on outer `div` element
    type: (undocumented)
    ...props: All other props will be put onto the inner `input[type="checkbox"]`.
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