# Alerts

## Description
Alerts use the [Iconography](/icons) component when using `withIcon` or `dismissable`. If you use those props, you will need to add an svg loader.

## Examples

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
::title=Alert links
::description=If you want to include a link in your alert, use the class `pui-alert-link`.
<div>
<WarningAlert>
<h5 className="em-high mtn">Important Link</h5>
    <p>
      It is very important that you <a className="pui-alert-link" href="http://bit.ly/1vkXaYb" aria-label="demo link to a funny gif">click here</a>
    </p>
</WarningAlert>
</div>
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

## Installation & Usage

#### React
`npm install babel-loader react-svg-loader --save-dev`

`npm install pivotal-ui --save`

`import {SuccessAlert, InfoAlert, WarningAlert, ErrorAlert} from 'pivotal-ui/react/alerts';`

#### CSS Only
`npm install pivotal-ui --save`

`import * as Alerts from 'pivotal-ui/css/alerts';`

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
closeLabel  | no | Node     | 'Close alert' | Screen reader label attached to close button
dismissable | no | Boolean  | false         | If true, render a close button
onDismiss   | no | Function |               | Callback that is called when the user clicks the close button
show        | no | Boolean  |               | If set, overrides the close button. True shows the alert, false hides the alert.
withIcon    | no | Boolean  | false         | If true, render alert with an icon