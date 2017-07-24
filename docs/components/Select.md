# Select

## Subcomponents

- [HTML Selects](#html-selects)
- [React Selects](#react-selects)

# HTML Selects

## Description

TODO

Selects are excellent to use because they will automatically behave as expected cross browser on different devices. Prefer them over a custom dropdown whenever possible.

```html
::title=Selects
<form class="styleguide-form" role="form">
  <div class="form-group">
    <select class="form-control">
      <option>default option</option>
      <option>an option</option>
      <option>another option</option>
    </select>
  </div>
</form>
```

```html
::title=Sizing
::description=Set heights using the form control classes `.input-lg` and `.input-sm`. Create larger or smaller form controls that match button sizes.
<div class="form-group">
  <select class="form-control input-lg">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>

<div class="form-group">
  <select class="form-control">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>

<div class="form-group">
  <select class="form-control input-sm">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>
```

## Installation & Usage

`npm install pui-css-select --save`

# React Selects

## Examples

```jsx
::title=Basic example
<div>
    <Select name='even-numbers' defaultValue='zero' options={['zero', 'two', 'four', 'six', 'eight']}/>
</div>
```
## Installation & Usage

`npm install babel-loader react-svg-loader --save-dev`

`npm install pui-react-select --save`

`import {Select} from 'pui-react-select';`

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
defaultValue | no  | Any      | | The initial value for the select when the select is uncontrolled
name         | no  | String   | | The name of the hidden input, useful when used in a form
onChange     | no  | Function | | Callback that fires when the select is changed, must be provided for controlled inputs
onEntered    | no  | Function | | Callback that fires after opening the select
onExited     | no  | Function | | Callback that fires after closing the select
options      | yes | Array    | | Options for the select, can be string or numbers or an object with label and value (e.g. `['one', 'two', 'three']`, `[1, 2, 3]`, `[{label: 'yes', value: 1}, {label: 'no', value: 0}]`)
value        | no  | Any      | | The value for the select when it is controlled, must be used with an `onChange` function to update the value of the select
