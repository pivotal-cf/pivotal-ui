# Alerts

## Installation & Usage

#### React
`npm install babel-loader react-svg-loader --save-dev`

`npm install pui-react-alerts --save`

`import {SuccessAlert, InfoAlert, WarningAlert, ErrorAlert} from 'pui-react-alerts';`

#### CSS Only
`npm install pui-css-alerts --save`

## Description
Description of Alerts goes here.

Alerts use the [Iconography](/react_base_iconography.html) component when using `withIcon` or `dismissable`. If you use those props, you will need to add an svg loader.

## Examples

```jsx
::title=Basic Example
<div>
<SuccessAlert>Everything is wonderful</SuccessAlert>
<InfoAlert>Here's some information for you</InfoAlert>
<WarningAlert>There is no parking on the dancefloor</WarningAlert>
<ErrorAlert>Something has gone horribly awry</ErrorAlert>
</div>
```

```jsx
::title=Complex Example
::description=Alerts are also used to bring important notes to a user's attention. If the content of your alert is a little more complicated, we would recommend using headings coupled with the content.
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

```jsx
::title=Alert Links
::description=If you want to include a link in your alert, use the class `alert-link`.
<div>
<WarningAlert>
<h5 className="em-high mtn">Important Link</h5>
    <p>
      It is very important that you <a className="alert-link" href="http://bit.ly/1vkXaYb" aria-label="demo link to a funny gif">click here</a>
    </p>
</WarningAlert>
</div>
```

```jsx
::title=Dismissible Alert Example
::description=Add the `dismissable` property to add a close button to the alert.
<SuccessAlert dismissable>Everything is wonderful</SuccessAlert>
```

```jsx
::title=Callback on Dismiss Example
::description=If you want a callback to be called when the close button is clicked, set the `onDismiss` property to that callback.
const callback = () => alert('Dismissed!');
<InfoAlert onDismiss={callback} dismissable>with callback</InfoAlert>
```

```jsx
::title=Alerts With Icons Example
::description=If you want an icon to be displayed, set the `withIcon` property.
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