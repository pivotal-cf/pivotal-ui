---
title: Alerts
cssPath: pivotal-ui/css/alerts
reactPath: pivotal-ui/react/alerts
reactComponents:
- SuccessAlert
- InfoAlert
- WarningAlert
- ErrorAlert
---

Use the `SuccessAlert`, `ErrorAlert`, `InfoAlert`, and `WarningAlert` components to alert the user of some change in state.

For example, here are alerts for various outcomes of uploading a file:

```jsx
//title=Various alerts
<div>
  <SuccessAlert>File 'abc.txt' uploaded successfully!</SuccessAlert>
  <ErrorAlert>File 'abc.txt' failed to upload.</ErrorAlert>
  <InfoAlert>Upload started: 'abc.txt'</InfoAlert>
  <WarningAlert>'abc.txt' is now publicly available</WarningAlert>
</div>
```

To allow the user to hide the alert after reading it, set the `dismissable` prop to add a clickable close icon:

```jsx
//title=Dismissable alert
<SuccessAlert dismissable>File 'abc.txt' uploaded successfully!</SuccessAlert>
```

To perform some action when the user dismisses an alert, set the `onDismiss` prop:

```jsx
//title=Dismissable alert with callback
<ErrorAlert dismissable onDismiss={() => alert('Alert dismissed')}>File 'abc.txt' failed to upload.</ErrorAlert>
```

Use the `withIcon` prop to add an icon to the alert:

```jsx
//title=Alert with icon
<div>
  <SuccessAlert withIcon>File 'abc.txt' uploaded successfully!</SuccessAlert>
  <ErrorAlert withIcon>File 'abc.txt' failed to upload.</ErrorAlert>
  <InfoAlert withIcon>Upload started: 'abc.txt'</InfoAlert>
  <WarningAlert withIcon>'abc.txt' is now publicly available</WarningAlert>
</div>
```

Alerts can contain any content. To have links within this content styled correctly, apply the `pui-alert-link` class to any `<a>` tag that appears inside the alert.

```jsx
//title=Alert with complex content
<WarningAlert>
  The following items need review:
  <ul className="man">
    <li>Item one. <a href="#" className="pui-alert-link">Click here</a> for more information.</li>
    <li>Item two. <a href="#" className="pui-alert-link">Click here</a> for more information.</li>
  </ul>
</WarningAlert>
```

By default, alerts maintain their dismissed/not dismissed state internally. To hold this state at a higher level (in a parent component), pass the `show` prop to the alert.

```jsx
//title=Controlled alert
class AlertController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {alertVisible: true};
  }

  render() {
    const {alertVisible} = this.state;

    if (!alertVisible) {
      return <DefaultButton onClick={() => this.setState({alertVisible: true})}>Show alert</DefaultButton>
    }

    return (
      <SuccessAlert show={alertVisible} dismissable onDismiss={() => this.setState({alertVisible: false})}>Visible alert</SuccessAlert>
    );
  }
}

<AlertController/>
```

## Props

The `SuccessAlert`, `ErrorAlert`, `InfoAlert`, and `WarningAlert` components all take the following props:

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
`closeLabel`  | no | Node     | 'Close alert' | Screen reader label attached to close button
`dismissable` | no | Boolean  | false         | If true, render a close button
`onDismiss`   | no | Function |               | Callback that is called when the user clicks the close button
`show`        | no | Boolean  |               | If set, overrides the close button. True shows the alert, false hides the alert.
`withIcon`    | no | Boolean  | false         | If true, render alert with an icon
