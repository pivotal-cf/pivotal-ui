var React = require('react');
var types = React.PropTypes;
var BsAlert = require('react-bootstrap').Alert;
var {Media} = require('pui-react-media');

var Alert = React.createClass({
  propTypes: {
    bsStyle: types.string,
    dismissable: types.oneOfType([types.bool, types.func]),
    withIcon: types.bool,
    alertIcon: types.string
  },

  getDefaultProps() {
    return {
      dismissable: false,
      withIcon: false
    };
  },

  getInitialState() {
    return {
      alertVisible: true
    };
  },

  render() {
    var {dismissable, withIcon, alertIcon, children, ...others} = this.props;

    if (this.state.alertVisible) {
      var onDismiss = dismissable ? this.handleAlertDismiss : null;

      if (withIcon) {
        var icon = <i className={`fa ${alertIcon}`}></i>;
        children = <Media className={'mtn'} leftImage={icon}>{children}</Media>;
      }
      return <BsAlert {...others} onDismiss={onDismiss}>{children}</BsAlert>;
    }

    return <span/>;
  },

  handleAlertDismiss: function() {
    var {dismissable} = this.props;
    if (typeof dismissable === 'function') dismissable();
    this.setState({alertVisible: false});
  }
});

function defAlert(props) {
  return React.createClass({
    propTypes: {
      dismissable: types.oneOfType([types.bool, types.func]),
      withIcon: types.bool
    },
    render() {
      const {children, ...others} = this.props;
      return (
        <Alert {...props} {...others}>
          <span className="sr-only">
            {(props.bsStyle === 'danger' ? 'error' : props.bsStyle) + ' alert message,'}
          </span>
          {children}
        </Alert>
      );
    }
  });
}

module.exports = {
  /**
   * @component SuccessAlert
   * @description Display a flash message to the user indicating success.
   *
   * @property dismissable
   *   {Boolean} Determines whether the alert can be closed by the user
   *   {Function} Called when the user closes the alert
   *
   * @property withIcon {Boolean} Whether to show an icon with the alert text.
   *
   * @example ```js
   * var SuccessAlert = require('pui-react-alerts').SuccessAlert;
   * var MyComponent = React.createClass({
   *   render() {
   *     return <SuccessAlert>The action was successful.</SuccessAlert>;
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#alerts_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#alert)
   */
  SuccessAlert: defAlert({bsStyle: 'success', alertIcon: 'fa-check-circle'}),

  /**
   * @component InfoAlert
   * @description Display an informational flash message to the user.
   *
   * @property dismissable
   *   {Boolean} Determines whether the alert can be closed by the user
   *   {Function} Called when the user closes the alert
   *
   * @property withIcon {Boolean} Whether to show an icon with the alert text.
   *
   * @example ```js
   * var InfoAlert = require('pui-react-alerts').InfoAlert;
   * var MyComponent = React.createClass({
   *   render() {
   *     return <InfoAlert>For your information...</InfoAlert>;
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#alerts_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#alert)
   */
  InfoAlert: defAlert({bsStyle: 'info', alertIcon: 'fa-info-circle'}),

  /**
   * @component WarningAlert
   * @description Display a flash message to warn the user.
   *
   * @property dismissable
   *   {Boolean} Determines whether the alert can be closed by the user
   *   {Function} Called when the user closes the alert
   *
   * @property withIcon {Boolean} Whether to show an icon with the alert text.
   *
   * @example ```js
   * var WarningAlert = require('pui-react-alerts').WarningAlert;
   * var MyComponent = React.createClass({
   *   render() {
   *     return <WarningAlert>You've been mentioned in chat.</WarningAlert>;
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#alerts_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#alert)
   */
  WarningAlert: defAlert({bsStyle: 'warning', alertIcon: 'fa-exclamation-triangle'}),

  /**
   * @component ErrorAlert
   * @description Display a flash message to the user indicating an error condition.
   *
   * @property dismissable
   *   {Boolean} Determines whether the alert can be closed by the user
   *   {Function} Called when the user closes the alert
   *
   * @property withIcon {Boolean} Whether to show an icon with the alert text.
   *
   * @example ```js
   * var ErrorAlert = require('pui-react-alerts').ErrorAlert;
   * var MyComponent = React.createClass({
   *   render() {
   *     return <ErrorAlert>Oops, something bad happened.</ErrorAlert>;
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#alerts_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#alert)
   */
  ErrorAlert: defAlert({bsStyle: 'danger', alertIcon: 'fa-exclamation-triangle'})
};


/*doc
---
title: Alerts
name: alerts_react
categories:
- React
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component"></i>
npm install pui-react-alerts --save
</code>

Require the subcomponents:

```
import {
  SuccessAlert,
  InfoAlert,
  WarningAlert,
  ErrorAlert
} from 'pui-react-alerts';
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
