/*doc
---
title: Alerts
name: alerts_react
categories:
- react_components_alerts
- react_all
---

<code class="pam">
  <img src="/styleguide/download.svg" width="16" height="16"/>
  npm install pui-react-alerts --save
</code>


Alerts use the [Iconography](/react_base_iconography.html) component when using `withIcon` or `dismissable`.
If you use those props, you will need to add an svg loader:

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader svg-react-loader --save-dev
</code>


Require the subcomponents:

```
import {SuccessAlert} from 'pui-react-alerts');
import {InfoAlert} from 'pui-react-alerts');
import {WarningAlert} from 'pui-react-alerts');
import {ErrorAlert} from 'pui-react-alerts');
```


```react_example_table
<SuccessAlert>Everything is wonderful</SuccessAlert>

<InfoAlert>Here's some information for you</InfoAlert>

<WarningAlert>There is no parking on the dancefloor</WarningAlert>

<ErrorAlert>Something has gone horribly awry</ErrorAlert>
```

The Alert components accept the following optional properties:

Property           |  Type         | Description
-------------      | --------------| --------------------------------------------------------------------------
`closeLabel`       | String        | Screen reader label attached to close button
`dismissable`      | Boolean       | If true, render a close button
`onDismiss`        | Function      | Callback that is called when the user clicks the close button
`show`             | Boolean       | If set, overrides the close button. True shows the alert, false hides the alert.
`withIcon`         | Boolean       | If true, render alert with an icon

*/

/*doc
---
title: Dismissable
name: alerts_dismissable_react
parent: alerts_react
---

Add the `dismissable` property to add a close button to the alert.

```react_example_table
<SuccessAlert dismissable>Everything is wonderful</SuccessAlert>
```

If you want a callback to be called when the close button is
clicked, set the `onDismiss` property to that callback.

```jsx_example
const callback = () => alert('Dismissed!');
```

```react_example_table
<InfoAlert onDismiss={callback} dismissable>with callback</InfoAlert>
```

*/

/*doc
---
title: Alerts with Icons
name: alerts_icon_react
parent: alerts_react
---

If you want an icon to be displayed, set the `withIcon` property.

```react_example_table
<SuccessAlert withIcon>success</SuccessAlert>

<InfoAlert withIcon>info</InfoAlert>

<WarningAlert withIcon>warning</WarningAlert>

<ErrorAlert withIcon>error</ErrorAlert>
```

Here's a dismissable alert with an icon

```react_example_table
<WarningAlert dismissable withIcon>warning</WarningAlert>
```
*/
