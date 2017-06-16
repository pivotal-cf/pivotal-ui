# Notifications

## Installation & Usage

#### React
`npm install babel-loader react-svg-loader --save-dev`

`npm install pui-react-notifications --save`

#### CSS Only
`npm install pui-css-notifications --save`


(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

## Description

## Basic Usage

Import the subcomponents:

```
import {Notifications, AlertNotifications, NotificationItem, AlertNotifications} from 'pui-react-notifications';

// for the example
import {Flag} from 'pui-react-media';
import {Label} from 'pui-react-labels';
import {Icon} from 'pui-react-iconography';
```

```jsx
::title=No Notifications
<Notifications />
```

```jsx
::title=With Notifications
<Notifications>
  <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
    <Flag image={<h3 className="mvn"><Label>New</Label></h3>}>
      <h5 className="media-heading mbn type-dark-2">Notification</h5>
      <p className="type-sm type-neutral-5 mvn">Click for Cute Gif</p>
    </Flag>
  </NotificationItem>
</Notifications>
```

## Notification Sizing

```jsx
::title=Sizing Example
<div>
    <Notifications size="h1">
      <NotificationItem>Stuff</NotificationItem>
    </Notifications>
    
    <Notifications size="h2">
      <NotificationItem key={1}>Stuff</NotificationItem>
      <NotificationItem key={2}>Stuff</NotificationItem>
      <NotificationItem key={3}>Stuff</NotificationItem>
      <NotificationItem key={4}>Stuff</NotificationItem>
      <NotificationItem key={5}>Stuff</NotificationItem>
    </Notifications>
    
    <AlertNotifications size="h3">
      <NotificationItem>Stuff</NotificationItem>
    </AlertNotifications>
    
    <Notifications size="h4">
     <NotificationItem key={1}>Stuff</NotificationItem>
     <NotificationItem key={2}>Stuff</NotificationItem>
     <NotificationItem key={3}>Stuff</NotificationItem>
     <NotificationItem key={4}>Stuff</NotificationItem>
     <NotificationItem key={5}>Stuff</NotificationItem>
    </Notifications>
    
    <AlertNotifications size="h5">
      <NotificationItem>Stuff</NotificationItem>
    </AlertNotifications>
</div>
```

## Alerts

```jsx
::title=No Alerts
<AlertNotifications />
```

```jsx
::title=With Alerts
<div>
    <AlertNotifications>
      <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
        <Flag image={<Icon src="warning" className="h4 mrm" style={{fill: '#B38F1B'}}/>}>
          <h5 className="media-heading mbn type-dark-2">WARNING</h5>
          <p className="type-sm type-neutral-5 mvn">Click for Cute Gif</p>
        </Flag>
      </NotificationItem>
    </AlertNotifications>
</div>
```

If you want to customize the notification dropdown, you can use `className` to
add a modifier class to the `btn-group`. `id` and `style` will be applied to
the notfication button.

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
size | no | oneOf('h1', 'h2', 'h3', 'h4', 'h5', 'h6') | | Size of the notification
