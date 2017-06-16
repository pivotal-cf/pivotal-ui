# Select

## Installation & Usage

#### React
`npm install babel-loader react-svg-loader --save-dev`

`npm install pui-react-select --save`

#### CSS Only
`npm install pui-css-select --save`


(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

## Description

## Basic Usage

Import the subcomponents:

```
import {Select} from 'pui-react-select';
```

```jsx
::title=Basic Example
<div>
    <Select name='even-numbers' defaultValue='zero' options={['zero', 'two', 'four', 'six', 'eight']}/>
</div>
```

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
