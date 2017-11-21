# Checkboxes

## Example

```jsx
::title=Checkbox with label
::description=A Checkbox component renders a checkbox with a label. It accepts standard checkbox input properties (such as `placeholder`).
<Checkbox label="Label"/>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {Checkbox} from 'pivotal-ui/react/checkbox';`

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
displayError   | no | Boolean | false | Displays the error message when true
errorMessage   | no | Node    |       | Message that gets displayed when displayError is true
inputClassName | no | String  |       | Classname of the inner input element
id             | no | String  |       | The inner label will specify htmlFor=id
label          | no | Node    |       | The content of this label
labelClassName | no | String  |       | Sets the wrapping label classname
