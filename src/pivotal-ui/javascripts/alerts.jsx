'use strict';

var _ = require('lodash');
var React = require('react');
var BsAlert = require('react-bootstrap/Alert');

var AlertMixin = require('./mixins/alert-mixin');
var Media = require('pui-react-media').Media;

var Alert = React.createClass({
  getInitialState: function() {
    return {
      alertVisible: true
    };
  },

  render: function() {
    var {dismissable, withIcon, alertIcon, children, ...others} = this.props;

    if (this.state.alertVisible) {
      var onDismiss = dismissable ? this.handleAlertDismiss : null;

      if (withIcon) {
        var icon = <i className={"fa " + alertIcon}></i>;
        children = (
          <Media leftImage={icon}>
            {children}
          </Media>
        );
      }

      return (
        <BsAlert {...others} onDismiss={onDismiss}>
          {children}
        </BsAlert>
      );
    }

    return (
      <span />
    );
  },

  handleAlertDismiss: function() {
    var {dismissable} = this.props;

    if (_.isFunction(dismissable)) {
      dismissable();
    }
    this.setState({alertVisible: false});
  }
});

var SuccessAlert = React.createClass({
  mixins: [AlertMixin],

  render: function() {
    return (
      <Alert bsStyle="success" alertIcon="fa-check-circle" {...this.props} />
    );
  }
});

var InfoAlert = React.createClass({
  mixins: [AlertMixin],

  render: function() {
    return (
      <Alert bsStyle="info" alertIcon="fa-info-circle" {...this.props } />
    );
  }
});

var WarningAlert = React.createClass({
  mixins: [AlertMixin],

  render: function() {
    return (
      <Alert bsStyle="warning" alertIcon="fa-exclamation-triangle" {...this.props } />
    );
  }
});

var ErrorAlert = React.createClass({
  mixins: [AlertMixin],

  render: function() {
    return (
      <Alert bsStyle="danger" alertIcon="fa-exclamation-triangle" {...this.props } />
    );
  }
});

module.exports = {
  SuccessAlert: SuccessAlert,
  InfoAlert: InfoAlert,
  WarningAlert: WarningAlert,
  ErrorAlert: ErrorAlert
};
