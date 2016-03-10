/*doc
---
title: Notifications
name: notifications_react
categories:
 - react_components_notifications
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-notifications --save
</i>
</code>

Require the subcomponents:

```
var Notifications = require('pui-react-notifications').Notifications;
var AlertNotifications = require('pui-react-notifications').AlertNotifications;
var NotificationItem = require('pui-react-notifications').NotificationItem;

// for the example
var Flag = require('pui-react-media').Flag;
var Label = require('pui-react-labels').Label;
var Icon = require('pui-react-iconography').Icon;
var DefaultH3 = require('pui-react-typography').DefaultH3;
var DefaultH5 = require('pui-react-typography').DefaultH5;
```

Here's an example if there are no notifications:

```react_example_table
<Notifications />
```

Here's an example if there are notifications:

```jsx_example
var newLabel = <DefaultH3 className="mvn"><Label>New</Label></DefaultH3>;
```

```react_example_table
<Notifications>
  <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
    <Flag image={newLabel}>
      <DefaultH5 className="media-heading mbn type-dark-2">Notification</DefaultH5>
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

<Notifications size="h5">
  <NotificationItem>Stuff</NotificationItem>
</Notifications>

<AlertNotifications size="h6">
 <NotificationItem key={1}>Stuff</NotificationItem>
 <NotificationItem key={2}>Stuff</NotificationItem>
 <NotificationItem key={3}>Stuff</NotificationItem>
 <NotificationItem key={4}>Stuff</NotificationItem>
 <NotificationItem key={5}>Stuff</NotificationItem>
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
var alertImage = <Icon name="exclamation-triangle" className="h4 type-warn-3 mrm" />;
```

```react_example_table
<AlertNotifications>
  <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
    <Flag image={alertImage}>
      <DefaultH5 className="media-heading mbn type-dark-2">WARNING</DefaultH5>
      <p className="type-sm type-neutral-5 mvn">Click for Cute Gif</p>
    </Flag>
  </NotificationItem>
</AlertNotifications>
```

If you want to customize the notification dropdown, you can use `className` to add a modifier class to the `btn-group`. `id` and `style` will be applied to the notfication button.

*/
