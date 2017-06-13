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

## Complex Example

Alerts are also used to bring important notes to a user's attention. If the content of your alert
is a little more complicated, we would recommend using headings coupled with the content.

```jsx
::title=Complex Example
<div>
<InfoAlert>
<h5 className="em-high mtn">You should know...</h5>
    <p>There are some things you should note. Just in case you didn't figure it out already.</p>
    <ul>
      <li>thing 1</li>
      <li>thing 2</li>
    </ul>
</InfoAlert>
</div>
```

## Alert Links

If you want to include a link in your alert, use the class `alert-link`.

```jsx
::title=Alert Links
<div>
<WarningAlert>
<h5 className="em-high mtn">Important Link</h5>
    <p>
      It is very important that you <a className="alert-link" href="http://bit.ly/1vkXaYb" aria-label="demo link to a funny gif">click here</a>
    </p>
</WarningAlert>
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