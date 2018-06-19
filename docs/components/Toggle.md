---
title: Toggle
menu: components
cssPath: pivotal-ui/css/toggle
reactPath: pivotal-ui/react/toggle
reactComponents:
  - Toggle
---

# Overview

# Examples

```jsx
::title=Basic example
::description=The Toggle component takes an `onChange` callback.
<Toggle onChange={() => console.log('I have been toggled!')}/>
```

```jsx
::title=Toggle checked
::description=Toggles accept a `checked` prop that turns on the switch. Note that you must handle the addition and removal of the `checked` property yourself.
<Toggle checked onChange={() => console.log('I should handle check changes!')}/>
```

```jsx
::title=Toggle size
::description=Toggle has a `size` attribute that takes three options: small, medium (default), and large.
<Form>
  <FormRow>
    <FormCol inline labelPosition="after" label="Large">
      <Toggle size="large"/>
    </FormCol>
    <FormCol inline labelPosition="after" label="Medium">
      <Toggle size="medium"/>
    </FormCol>
    <FormCol inline labelPosition="after" label="Small">
      <Toggle size="small"/>
    </FormCol>
  </FormRow>
</Form>
```

# Props

Property       | Required | Type                              | Default  | Description
---------------|----------|-----------------------------------|----------|------------
`id`           | no       | String                            |          | The id of the element
`className`    | no       | String                            |          | Class name to put on the inner `label` element
`size`         | no       | oneOf('small', 'medium', 'large') | 'medium' | Size variations

_All other props are passed to the inner `input` element._