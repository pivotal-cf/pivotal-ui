---
title: Radios
cssPath: pivotal-ui/css/radio
reactPath: pivotal-ui/react/radio
reactComponents:
- Radio
- RadioGroup
---

The RadioGroup is a controlled input. The `name` and `onChange` props are passed down to all child components, which should be `<Radio/>` components (or `<input type="radio"/>`).

```jsx
//title=Controlled Radios
class MyComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {selection: null};
  }

  render() {
    const {selection} = this.state;
    return (
      <div>
        <RadioGroup value={selection} name="radio-group" onChange={event => this.setState({selection: event.target.value})}>
          <Radio value="others">Others</Radio>
          <Radio value="others1">More others</Radio>
          <Radio value="special">Click to enter email</Radio>
        </RadioGroup>
        {selection === 'special' && <input type="email" id="exampleInputEmail1" placeholder="Enter email"/>}
      </div>);
  }
}

<MyComponent/>;
```

## Props

### RadioGroup	props

Property   | Required | Type     | Default | Description
-----------|----------|----------|---------|------------
`id`       | no       | String   |         | The id of the element
`name`     | yes      | String   |         | This name is passed to all children, so you don't have to specify name manually each time
`onChange` | no       | Function |         | Callback that fires each time selection is changed
`value`    | no       | Any      |         | Should match the `value` of one of the `Radio` children

### Radio props

Property         | Required | Type    | Default | Description
-----------------|----------|---------|---------|------------
`checked`        | false    | boolean | | Whether the radio is checked, when controlled
`children`       | false    | node    | | Content to place within `label` to the right of the radio
`className`      | false    | string  | | Class name to put on outer `div` element
`defaultChecked` | false    | boolean | | Whether the radio is checked, when uncontrolled
`disabled`       | false    | boolean | | Whether the radio is disabled
`id`             | false    | string  | Auto-generated unique ID with prefix "radio" | ID to put on the inner `input[type="radio"]`
`labelClassName` | false    | string  | | Class name to put on the radio label
`name`           | false    | string  | | Name to set on inner `input[type="radio"]`
`noSelect`       | false    | boolean | | When `true`, prevents the label text from being selectable
`onChange`       | false    | func    | | onChange callback to set on inner `input[type="radio"]`
`style`          | false    | object  | | Style to put on outer `div` element
`value`          | true     | string  | | Value of the `input[type="radio"]`

_All other props will be put onto the inner `input[type="radio"]`._