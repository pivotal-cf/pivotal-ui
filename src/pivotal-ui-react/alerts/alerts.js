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
      return <Alert {...props} {...this.props} />;
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
