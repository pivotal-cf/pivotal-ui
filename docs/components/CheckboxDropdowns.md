---
title: Checkbox Dropdowns
cssPath: pivotal-ui/css/checkbox-dropdown
reactPath: pivotal-ui/react/checkbox-dropdown
reactComponents:
  - CheckboxDropdown
---

## Examples

```jsx
::title=Basic checkbox dropdown
<CheckboxDropdown {...{
  labels: ['DEBUG', 'WARNING', 'ERROR']
}} />
```

```jsx
::title=Checkbox dropdown with onChange

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: null};
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state.selected, null, 2)}</pre>
        <CheckboxDropdown {...{
          labels: ['DEBUG', 'WARNING', 'ERROR'],
          onChange: selected => this.setState({selected})
        }} />
      </div>
    );
  }
}

<Example />
```

## Props

Property         | Required | Type                                | Default        | Description
-----------------|----------|-------------------------------------|----------------|------------
buttonAriaLabel  | no       | String                              |                | aria-label for the button
buttonClassName  | no       | String                              |                | Classname to add to the button
flat             | no       | Boolean                             |                | If true, dropdown toggle has no borders and is transparent
labelAriaLabel   | no       | String                              |                | aria-label for the label
onChange         | no       | Function                            |                | Callback that fires after clicking a checkbox
size             | no       | oneOf(['normal', 'large', 'small']) | 'normal'       | Sets the size
split            | no       | Boolean                             |                | If true, separates the button text from the toggle
labels           | yes      | Array                               |                | Labels for the checkboxes
