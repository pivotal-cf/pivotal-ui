---
title: Checkbox Dropdowns
menu: components
cssPath: pivotal-ui/css/checkbox-dropdown
reactPath: pivotal-ui/react/checkbox-dropdown
reactComponents:
  CheckboxDropdown:
    buttonAriaLabel: aria-label for the button
    buttonClassName: Classname to add to the button
    flat: If true, dropdown toggle has no borders and is transparent
    labelAriaLabel: aria-label for the label
    onChange: Callback that fires after clicking a checkbox
    size: Sets the size
    split: If true, separates the button text from the toggle
    labels: Labels for the checkboxes
---

# Overview

# Examples

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