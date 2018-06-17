---
title: Notifications
menu: components
cssPath: pivotal-ui/css/notifications
reactPath: pivotal-ui/react/notifications
componentProps:
  Notifications:
    size: Size of the notification
  AlertNotifications:
    size: Size of the notification
  NotificationItem:
    href: href to navigate to when item is clicked
    ...props: All other props are passed to the inner `a` tag
---

# Overview

# Examples

```jsx
::title=No Notifications
<Notifications />
```

```jsx
::title=With Notifications
<Notifications>
  <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
    <Flag image={<h3 className="mvn btn btn-brand btn-sm phl">New</h3>}>
      <h5 className="media-heading mbn type-dark-2">Notification</h5>
      <p className="type-sm type-neutral-5 mvn">Click for Gif</p>
    </Flag>
  </NotificationItem>
</Notifications>
```

```jsx
::title=Notification sizing
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

```jsx
::title=No Alerts
<AlertNotifications />
```

```jsx
::title=With alerts
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
the notification button.
