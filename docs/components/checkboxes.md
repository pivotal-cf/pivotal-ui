---
title: Checkboxes
cssPath: pivotal-ui/css/checkbox
reactPath: pivotal-ui/react/checkbox
reactComponents:
- Checkbox
---

Checkboxes can be either checked, unchecked or indeterminate.

```jsx
//title=Checkboxes
<div>
  <Checkbox>Checkbox one (click me)</Checkbox>
  <Checkbox disabled>Checkbox two (disabled)</Checkbox>
  <Checkbox indeterminate>Checkbox three (indeterminate)</Checkbox>
</div>
```

```jsx
//title=Using indeterminate state
<Form {...{
  fields: {
    meat: {
      inline: true,
      hideHelpRow: true,
      labelPosition: 'after',
      label: 'Meat (Click below)',
      children: ({state: {current: {meat, chicken, beef}}, setValues}) => (
        <Checkbox {...{
          indeterminate: !!((chicken || beef) && !(chicken && beef)),
          onChange: () => setValues({chicken: !meat, beef: !meat})
        }}/>
      )
    },
    chicken: {
      inline: true,
      hideHelpRow: true,
      labelPosition: 'after',
      label: 'Chicken',
      children: ({state: {current: {chicken, beef}}, setValues}) =>
        <Checkbox onChange={() => setValues({meat: !chicken && beef})}/>
    },
    beef: {
      inline: true,
      hideHelpRow: true,
      labelPosition: 'after',
      label: 'Beef',
      children: ({state: {current: {chicken, beef}}, setValues}) =>
        <Checkbox onChange={() => setValues({meat: chicken && !beef})}/>
    }
  }
}}>
{({fields: {meat, chicken, beef}}) => (
  <div>
    {meat}
    <div className="mlxl">
      {chicken}
      {beef}
    </div>
  </div>
)}
</Form>
```

## Props

Property         | Required | Type    | Default | Description
-----------------|----------|---------|---------|------------
`checked`        | false    | boolean |         | Whether the checkbox is checked, when controlled
`children`       | false    | node    |         | Content to place within `label` to the right of the checkbox
`className`      | false    | string  |         | Class name to put on outer `div` element
`defaultChecked` | false    | boolean |         | Whether the checkbox is checked, when uncontrolled
`disabled`       | false    | boolean |         | Whether the checkbox is disabled
`id`             | false    | string  | Auto-generated unique ID with prefix "checkbox" | ID to put on the inner `input[type="checkbox"]`
`indeterminate`  | false    | boolean |         | Puts checkbox into an indeterminate state
`labelClassName` | false    | string  |         | Class name to put on the checkbox label
`name`           | false    | string  |         | Name to set on inner `input[type="checkbox"]`
`noSelect`       | false    | boolean |         | When `true`, prevents the label text from being selectable
`onChange`       | false    | func    |         | onChange callback to set on inner `input[type="checkbox"]`
`style`          | false    | object  |         | Style to put on outer `div` element

All other props will be put onto the inner `input[type="checkbox"]`.