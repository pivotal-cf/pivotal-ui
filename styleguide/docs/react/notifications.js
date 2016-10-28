/*doc
---
title: Notifications
name: notifications_react
categories:
 - react_components_notifications
 - react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-notifications --save

<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader svg-react-loader --save-dev
</code>

(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

Require the subcomponents:

```
var Notifications = require('pui-react-notifications').Notifications;
var AlertNotifications = require('pui-react-notifications').AlertNotifications;
var NotificationItem = require('pui-react-notifications').NotificationItem;

// for the example
var Flag = require('pui-react-media').Flag;
var Label = require('pui-react-labels').Label;
var Icon = require('pui-react-iconography').Icon;
```

Here's an example if there are no notifications:

```react_example_table
<Notifications />
```

Here's an example if there are notifications:

```jsx_example
var newLabel = <h3 className="mvn"><Label>New</Label></h3>;
```

```react_example_table
<Notifications>
  <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
    <Flag image={newLabel}>
      <h5 className="media-heading mbn type-dark-2">Notification</h5>
      <p className="type-sm type-neutral-5 mvn">Click for Cute Gif</p>
    </Flag>
  </NotificationItem>
</Notifications>
```
*/

/*doc
---
title: Notification Sizing
name: notifications_react_sizing
parent: notifications_react
---

```react_example_table
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
```
*/

/*doc
---
title: Alerts
name: alert_notifications_react
parent: notifications_react
---

Here's an example if there are no alerts:

```react_example_table
<AlertNotifications />
```

Here's an example if there are alerts:

```jsx_example
var alertImage = <Icon src="warning" className="h4 mrm" style={{fill: '#B38F1B'}}/>;
```

```react_example_table
<AlertNotifications>
  <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
    <Flag image={alertImage}>
      <h5 className="media-heading mbn type-dark-2">WARNING</h5>
      <p className="type-sm type-neutral-5 mvn">Click for Cute Gif</p>
    </Flag>
  </NotificationItem>
</AlertNotifications>
```

If you want to customize the notification dropdown, you can use `className` to add a modifier class to the `btn-group`. `id` and `style` will be applied to the notfication button.

*/
