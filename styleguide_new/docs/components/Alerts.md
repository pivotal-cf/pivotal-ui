# Alerts

## Description
Description of Alerts goes here.

## Basic Usage
Alerts use the [Iconography](/react_base_iconography.html) component when using `withIcon` or `dismissable`.
If you use those props, you will need to add an svg loader:

Import the subcomponents:

```
import {SuccessAlert, InfoAlert, WarningAlert, ErrorAlert} from 'pui-react-alerts';
```

```jsx
::title=Basic Example
<div>
<SuccessAlert>Everything is wonderful</SuccessAlert>
<InfoAlert>Here's some information for you</InfoAlert>
<WarningAlert>There is no parking on the dancefloor</WarningAlert>
<ErrorAlert>Something has gone horribly awry</ErrorAlert>
</div>
```

## Dismissable

```jsx
::title=Dismissible Alert Example
<SuccessAlert dismissable>Everything is wonderful</SuccessAlert>
```
Add the `dismissable` property to add a close button to the alert.

```jsx
::title=Callback on Dismiss Example
const callback = () => alert('Dismissed!');
<InfoAlert onDismiss={callback} dismissable>with callback</InfoAlert>
```
If you want a callback to be called when the close button is
clicked, set the `onDismiss` property to that callback.

## Alerts with Icons

If you want an icon to be displayed, set the `withIcon` property.

```jsx
::title=Alerts With Icons Example
<div>
<SuccessAlert withIcon>success</SuccessAlert>

<InfoAlert withIcon>info</InfoAlert>

<WarningAlert withIcon>warning</WarningAlert>

<ErrorAlert withIcon>error</ErrorAlert>
</div>
```

```jsx
::title=Dismissable Alert with an Icon
<WarningAlert dismissable withIcon>warning</WarningAlert>
```


## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
closeLabel  | no | Node     | 'Close alert' | Screen reader label attached to close button
dismissable | no | Boolean  | false         | If true, render a close button
onDismiss   | no | Function |               | Callback that is called when the user clicks the close button
show        | no | Boolean  |               | If set, overrides the close button. True shows the alert, false hides the alert.
withIcon    | no | Boolean  | false         | If true, render alert with an icon