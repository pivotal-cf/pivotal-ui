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


Use buttons as triggers for actions. Try to avoid the usage of buttons for navigation. The main difference between actions and navigation is that **actions** are operations performed on objects, while **navigation** refers to elements on the screen or view that take you to another context in the application. For navigation, consider simply using links.

Pivotal UI provides four kinds of buttons: primary buttons, default buttons, danger buttons, and brand buttons. See below for examples.

By default, each button is designed to have accessible color contrast over light backgrounds (`white` or `light-gray`). To use a button over a dark background (`black` or `dark-gray`), see the examples below.

## Button types

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
//title=Default button
<DefaultButton>Secondary Call to Action</DefaultButton>
```

Brand buttons can be used to incorporate Pivotal's teal color. In most cases, one of the other three button types should be used instead.

```jsx
//title=Brand button
<BrandButton>Pivotal Button</BrandButton>
```

## Usage on dark backgrounds

Buttons that appear over dark backgrounds are styled differently to achieve accessible color contrast. To make a button accessible against a dark background, set the `onDark` prop.

```jsx
//title=Using the onDark prop
<div className="bg-dark-gray pal">
  <PrimaryButton onDark>Primary Button</PrimaryButton>
  <DefaultButton onDark>Default Button</DefaultButton>
  <DangerButton onDark>Danger Button</DangerButton>
  <BrandButton onDark>Brand Button</BrandButton>
</div>
```

Alternatively, you can wrap components in the `ThemeProvider` component.

## Common button patterns

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

To use a button with an icon and no text, set the `iconOnly` prop to make spacing even around the icon. Since they do not have text content, icon-only buttons must have an `aria-label` set so that screen readers understand their purpose.

```jsx
//title=Icon-only buttons
<div>
  <DefaultButton icon={<Icon src="mode_edit"/>} iconOnly aria-label="Edit"/>
  <DefaultButton flat icon={<Icon src="close"/>} iconOnly aria-label="Close"/>
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

A common pattern is to have a button that triggers an action, then is disabled and shows a spinner until the action completes. This can be achieved with the `icon` and `disabled` props.

```jsx
//title=Submit button
function ButtonWithProgress() {
  const [inProgress, setInProgress] = React.useState(false);

  function doAsyncAction() {
    setInProgress(true);
    setTimeout(() => setInProgress(false), 3000);
  }

  return (
    <PrimaryButton
      disabled={inProgress}
      icon={inProgress ? <Icon src="spinner-lg"/> : null}
      onClick={doAsyncAction}>
        {inProgress ? 'Saving...' : 'Next Step'}
    </PrimaryButton>
  );
}

<ButtonWithProgress/>
```

## Props

Property       | Required | Type    | Default | Description
---------------|----------|---------|---------|------------
`alt`          | no       | Boolean | false   | Whether to render as 'alternate' button
`flat`         | no       | Boolean | false   | Whether to render as a 'flat' button
`fullWidth`    | no       | Boolean | false   | Whether to render the button full width
`href`         | no       | String  |         | If specified, button will be rendered as an `<a>` tag with button-like styling that links to this `href`
`iconOnly`     | no       | Boolean | false   | If specified, will render as an icon button
`iconPosition` | no       | `"left"` or `"right"`  | `"left"` | If specified, places the icon to the left or the right of the text and or children
`large`        | no       | Boolean | false   | Whether to render the button large
`small`        | no       | Boolean | false   | Whether to render the button small
