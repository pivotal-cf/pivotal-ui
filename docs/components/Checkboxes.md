# Checkboxes

## Example

```jsx
::title=Checkbox with label
::description=A Checkbox component renders a checkbox with a label.
<div>
    <Checkbox>Checkbox one</Checkbox>
    <Checkbox disabled>Checkbox two (disabled)</Checkbox>
</div>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {Checkbox} from 'pivotal-ui/react/checkbox';`

## Props

Property       | Required | Type    | Default | Description
---------------|----------|---------|---------|------------
checked        | false    | boolean | | Whether the checkbox is checked, when controlled
children       | false    | node    | | Content to place within `label` to the right of the checkbox
className      | false    | string  | | Class name to put on outer `div` element
disabled       | false    | boolean | | Whether the checkbox is disabled
defaultChecked | false    | boolean | | Whether the checkbox is checked, when uncontrolled
id             | false    | string  | Auto-generated unique ID with prefix "checkbox" | ID to put on the inner `input[type="checkbox"]`
labelClassName | false    | string  | | Class name to put on the checkbox label
name           | false    | string  | | Name to set on inner `input[type="checkbox"]`
onChange       | false    | func    | | onChange callback to set on inner `input[type="checkbox"]`
style          | false    | object  | | Style to put on outer `div` element

All other props will be put onto the inner `input[type="checkbox"]`.