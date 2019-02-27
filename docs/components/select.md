---
title: Select
cssPath: pivotal-ui/css/select
---

Native HTML `select`s are excellent to use because they will automatically behave as expected cross browser on different devices. Use `select` inside a form, not custom dropdowns. Use [Dropdowns](/components/dropdowns/usage) for navigation.

```jsx
//title=Sizing
//description=Set heights using the form control classes `.input-lg` and `.input-sm`. Create larger or smaller form controls that match button sizes.
<div>
  <select className="input-lg">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
  <select className="mtxl">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
  <select className="input-sm mtxl">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
`defaultValue` | no  | Any      | | The initial value for the select when the select is uncontrolled
`name`         | no  | String   | | The name of the hidden input, useful when used in a form
`onChange`     | no  | Function | | Callback that fires when the select is changed, must be provided for controlled inputs
`onEntered`    | no  | Function | | Callback that fires after opening the select
`onExited`     | no  | Function | | Callback that fires after closing the select
`options`      | yes | Array    | | Options for the select, can be string or numbers or an object with label and value (e.g. `['one', 'two', 'three']`, `[1, 2, 3]`, `[{label: 'yes', value: 1}, {label: 'no', value: 0}]`)
`value`        | no  | Any      | | The value for the select when it is controlled, must be used with an `onChange` function to update the value of the select
