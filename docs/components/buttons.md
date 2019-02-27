---
title: Buttons
cssPath: pivotal-ui/css/buttons
reactPath: pivotal-ui/react/buttons
reactComponents:
- DefaultButton
- PrimaryButton
- DangerButton
- BrandButton
---

Use buttons as triggers for actions that are used in forms, toolbars, and as stand-alone action triggers. Try to avoid the usage of buttons for navigation. The main difference between actions and navigation is that **actions** are operations performed on objects, while **navigation** refers to elements on the screen or view that take you to another context in the application. For navigation, consider simply using links.

Text within a button is all uppercase. The `aria-label` attribute will be populated with the button text, unless an `aria-label` prop is explicitly supplied. Buttons side-by-side will be separated by a margin of `8px`, per the [8-point grid](/concepts/8-point_grid/index).

Primary buttons should be used for the main action of a view, eg. a page, flyout, or modal. There will likely only be one of these on-screen at a time.

```jsx
//title=Primary button
<PrimaryButton>Create Thing</PrimaryButton>
```

If completing this action can have destructive effects, such as deletion, use a danger button. Like primary buttons, danger buttons draw attention. Both indicate the main action, so use only one or the other per view.

```jsx
//title=Danger button
<DangerButton>Delete Thing</DangerButton>
```

Use a default button for other actions that could be taken on a view.

```jsx
//title=Default buttons
<DefaultButton>Secondary Call to Action</DefaultButton>
```

When an action can be cancelled (e.g. closing a payment modal without completing the transaction), use a pair of buttons. The button on the left should have `alt` and should allow the user to cancel the workflow. The button on the right should confirm the action and should not have the `alt` prop.

```jsx
//title=Typical cancel & confirm buttons
<div>
  <PrimaryButton alt>Cancel</PrimaryButton>
  <PrimaryButton>Confirm</PrimaryButton>
</div>
```

When the action is destructive, follow the same pattern with danger buttons.

```jsx
//title=Cancel & delete danger buttons
<div>
  <DangerButton alt>Cancel</DangerButton>
  <DangerButton>Delete</DangerButton>
</div>
```

For a button that performs a non-essential action, set the `flat` prop to remove the background and the border.

```jsx
//title=Flat buttons
<div>
  <PrimaryButton flat>Add</PrimaryButton>
  <DangerButton flat>Remove</DangerButton>
  <DefaultButton flat>Duplicate</DefaultButton>
</div>
```

Set the `icon` prop to add an icon next to the button text.

```jsx
//title=Button with icon
<PrimaryButton icon={<Icon src="add"/>}>New Item</PrimaryButton>
```

By default, the icon appears to the left of the text. To place the icon on the right, set the `iconPosition` prop to `"right"`.

```jsx
//title=Button with right icon
<PrimaryButton icon={<Icon src="arrow_forward"/>} iconPosition="right">Next</PrimaryButton>
```

To use a button with an icon and no text, set the `iconOnly` prop to make spacing even around the icon.

```jsx
//title=Icon-only buttons
<div>
  <DefaultButton icon={<Icon src="mode_edit"/>} iconOnly/>
  <DefaultButton flat icon={<Icon src="close"/>} iconOnly/>
</div>
```

Set the `disabled` prop on a button to prevent a user from interacting with it.

```jsx
//title=Disabled button
<PrimaryButton disabled>Save</PrimaryButton>
```

Set the `large` or `small` prop to increase or decrease the size of the button. In most cases use the default size.

```jsx
//title=Sizing
<div>
  <DefaultButton large>Large Button</DefaultButton>
  <DefaultButton>Default</DefaultButton>
  <DefaultButton small>Small Button</DefaultButton>
</div>
```

Set the `fullWidth` prop to make the button take up the full width of its container. This is useful for responsive layouts.

```jsx
//title=Full-width button
<DefaultButton fullWidth>Full-width Button</DefaultButton>
```

A common pattern is to have a button that triggers an action, then is disabled and shows a spinner until the action completes. This can be achieved with the `icon` and `disabled` props. Use this in a [Form](/components/forms/usage#form-submission).

```jsx
//title=Submit button
class ButtonWithProgress extends React.PureComponent {
  constructor(props) {
   super(props);
   this.doAsyncAction = this.doAsyncAction.bind(this);
   this.state = {inProgress: false};
  }

  doAsyncAction() {
    this.setState({inProgress: true});
    setTimeout(() => this.setState({inProgress: false}), 3000);
  };

  render() {
    const {inProgress} = this.state;
    return (<PrimaryButton
      disabled={inProgress}
      icon={inProgress ? <Icon src="spinner-lg"/> : null}
      onClick={this.doAsyncAction}>
        {inProgress ? 'Saving...' : 'Next Step'}
    </PrimaryButton>);
  }
}

<ButtonWithProgress/>
```

## Props

Property       | Required | Type    | Default | Description
---------------|----------|---------|---------|------------
`alt`          | no       | Boolean | false   | Whether to render as 'alternate' button
`flat`         | no       | Boolean | false   | Whether to render as a 'flat' button
`fullWidth`    | no       | Boolean | false   | Whether to render the button full width
`href`         | no       | String  |         | If specified, button clicks will redirect to this href
`iconOnly`     | no       | Boolean | false   | If specified, will render as an icon button
`iconPosition` | no       | String  |         | If specified, places the icon to the left or the right of the text and or children
`large`        | no       | Boolean | false   | Whether to render the button large
`small`        | no       | Boolean | false   | Whether to render the button small
