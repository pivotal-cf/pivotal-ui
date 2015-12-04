/*doc
 ---
 title: Alerts
 name: alerts_react
 categories:
 - react_components_alerts
 - react_all
 ---

 <code class="pam">
 <i class="fa fa-download" alt="Install the Component"></i>
 npm install pui-react-alerts --save
 </code>

 Require the subcomponents:

 ```
 var SuccessAlert = require('pui-react-alerts').SuccessAlert;
 var InfoAlert = require('pui-react-alerts').InfoAlert;
 var WarningAlert = require('pui-react-alerts').WarningAlert;
 var ErrorAlert = require('pui-react-alerts').ErrorAlert;
 ```


 ```react_example_table
 <SuccessAlert>Everything is wonderful</SuccessAlert>

 <InfoAlert>Here's some information for you</InfoAlert>

 <WarningAlert>There is no parking on the dancefloor</WarningAlert>

 <ErrorAlert>Something has gone horribly awry</ErrorAlert>
 ```
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
 clicked, set the `dismissable` property to that callback.

 ```jsx_example
 var callback = function() {
   alert('Dismissed!');
 };
 ```

 ```react_example_table
 <InfoAlert dismissable={callback}>with callback</InfoAlert>
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
