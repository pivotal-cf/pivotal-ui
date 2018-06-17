---
title: Radios
menu: components
cssPath: pivotal-ui/css/radio
reactPath: pivotal-ui/react/radio
componentProps:
  Radio:
    checked: Whether the radio is checked, when controlled
    children: Content to place within `label` to the right of the radio
    className: Class name to put on outer `div` element
    disabled: Whether the radio is disabled
    defaultChecked: Whether the radio is checked, when uncontrolled
    id: ID to put on the inner `input[type="radio"]`
    labelClassName: Class name to put on the radio label
    name: Name to set on inner `input[type="radio"]`
    onChange: onChange callback to set on inner `input[type="radio"]`
    style: Style to put on outer `div` element
    value: Value of the `input[type="radio"]`
    ...rest: All other props will be put onto the inner `input[type="radio"]`.
  RadioGroup:
    id: The id of the element
    name: This name is passed to all children, so you don't have to specify name manually each time
    onChange: Callback that fires each time selection is changed
---

# Overview

# Examples

```jsx
::title=Basic example
::description=In this case, the `name` attached to `RadioGroup` will be applied to all of Radio children.
<RadioGroup name="field_name">
  <Radio value="firstValue">You could click this radio button</Radio>
  <Radio value="SecondValue" defaultChecked>This is also a radio button</Radio>
  <Radio value="ThirdValue" disabled>This is a disabled radio button</Radio>
</RadioGroup>
```

```jsx
::title=onChange
::description=Additionally, special behaviors can be added to the `onChange` event handler exposed by radio groups. In this example, additional form controls are displayed when the user selects the third radio button. Similar to the `name` property, the `onChange` handlers is passed down to all child components.
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selection: null};
  }

  render() {
    return (
      <Form>
        <FormRow>
          <FormCol label="Options" name="stuff">
            <RadioGroup name="radio-group" onChange={event => this.setState({selection: event.target.value})}>
              <Radio value="others">Others</Radio>
              <Radio value="others1" defaultChecked>More others</Radio>
              <Radio value="special">Click for more!</Radio>
            </RadioGroup>
          </FormCol>
        </FormRow>
        {this.state.selection === 'special' && (
          <FormRow>
            <FormCol label="Email address" name="email">
              <input type="email" id="exampleInputEmail1" placeholder="Enter email" />
            </FormCol>
          </FormRow>
        )}
      </Form>
    );
  }
}

<MyComponent />
```
