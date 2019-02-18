---
title: Toggle
cssPath: pivotal-ui/css/toggle
reactPath: pivotal-ui/react/toggle
reactComponents:
- Toggle
---

```jsx
//title=Basic example
//description=The Toggle component takes an `onChange` callback.
<Toggle onChange={() => alert('I have been toggled!')}/>
```

```jsx
//title=Toggle checked
//description=Toggles accept a `checked` prop that turns on the switch. Note that you must handle the addition and removal of the `checked` property yourself.
<Toggle checked onChange={() => alert('I should handle check changes!')}/>
```

```jsx
//title=Toggle size
//description=Toggle has a `size` attribute that takes three options: small, medium (default), and large.
<Grid>
  <FlexCol>
    <FormUnit inline labelPosition="after" label="Large">
      <Toggle size="large"/>
    </FormUnit>
  </FlexCol>
  <FlexCol>
    <FormUnit inline labelPosition="after" label="Medium">
      <Toggle size="medium"/>
    </FormUnit>
  </FlexCol>
  <FlexCol>
    <FormUnit inline labelPosition="after" label="Small">
      <Toggle size="small"/>
    </FormUnit>
  </FlexCol>
</Grid>
```

## Toggle

Property       | Required | Type                              | Default  | Description
---------------|----------|-----------------------------------|----------|------------
`className`    | no       | String                            |          | Class name to put on the inner `label` element
`id`           | no       | String                            |          | The id of the element
`size`         | no       | oneOf('small', 'medium', 'large') | 'medium' | Size variations

_All other props are passed to the inner `input` element._