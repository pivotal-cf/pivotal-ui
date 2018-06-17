---
title: Alerts
menu: components
cssPath: pivotal-ui/css/alerts
reactPath: pivotal-ui/react/alerts
componentProps:
  SuccessAlert:
    closeLabel: Screen reader label attached to close button
    dismissable: If true, render a close button
    onDismiss:  Callback that is called when the user clicks the close button
    show: If set, overrides the close button. True shows the alert, false hides the alert.
    withIcon: If true, render alert with an icon
    alertIcon: (undocumented)
    bsStyle: (undocumented)
  InfoAlert:
    _extends: SuccessAlert
  WarningAlert:
    _extends: SuccessAlert
  ErrorAlert:
    _extends: SuccessAlert
---

# Overview

Alerts use the [Iconography](/icons) component when using `withIcon` or `dismissable`. If you use those props, you will need to add an svg loader.

# Examples

```jsx
::title=Basic example
<div>
  <SuccessAlert>Everything is wonderful</SuccessAlert>
  <InfoAlert>Here's some information for you</InfoAlert>
  <WarningAlert>There is no parking on the dancefloor</WarningAlert>
  <ErrorAlert>Something has gone horribly awry</ErrorAlert>
</div>
```

```jsx
::title=Complex example
::description=Alerts are also used to bring important notes to a user's attention. If the content of your alert is a little more complicated, we would recommend using headings coupled with the content.
<InfoAlert>
  <h5 className="em-high mtn">You should know...</h5>
  <p>There are some things you should note. Just in case you didn't figure it out already.</p>
  <ul>
    <li>thing 1</li>
    <li>thing 2</li>
  </ul>
</InfoAlert>
```

```jsx
::title=Alert links
::description=If you want to include a link in your alert, use the class `pui-alert-link`.
<WarningAlert>
  <h5 className="em-high mtn">Important Link</h5>
  <p>
    It is very important that you <a className="pui-alert-link" href="http://www.example.com/">click here</a>
  </p>
</WarningAlert>
```

```jsx
::title=Dismissible alert example
::description=Add the `dismissable` property to add a close button to the alert.
<SuccessAlert dismissable>Everything is wonderful</SuccessAlert>
```

```jsx
::title=Callback on dismiss example
::description=If you want a callback to be called when the close button is clicked, set the `onDismiss` property to that callback.
const callback = () => alert('Dismissed!');
<InfoAlert onDismiss={callback} dismissable>with callback</InfoAlert>
```

```jsx
::title=Alerts with icons example
::description=If you want an icon to be displayed, set the `withIcon` property.
<div>
  <SuccessAlert withIcon>success</SuccessAlert>
  <InfoAlert withIcon>info</InfoAlert>
  <WarningAlert withIcon>warning</WarningAlert>
  <ErrorAlert withIcon>error</ErrorAlert>
</div>
```

```jsx
::title=Dismissable alert with an icon
<WarningAlert dismissable withIcon>warning</WarningAlert>
```