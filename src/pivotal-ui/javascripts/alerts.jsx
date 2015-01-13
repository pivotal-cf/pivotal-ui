'use strict';

var React = require('react');
var BsAlert = require('react-bootstrap/Alert');
var Media = require('./media.jsx').Media;

var Alert = React.createClass({
  getInitialState: function() {
    return {
      alertVisible: true
    };
  },

  render: function() {
    if (this.state.alertVisible) {
      var onDismiss = this.props.dismissable ? this.handleAlertDismiss : null;

      var children;

      if (this.props.withIcon) {
        var icon = <i className={"fa " + this.props.alertIcon}></i>;
        children = (
          <Media leftImage={icon}>
            {this.props.children}
          </Media>
        );
      } else {
        children = this.props.children;
      }
      return (
        <BsAlert onDismiss={onDismiss} {...this.props }>
          {children}
        </BsAlert>
      );
    }

    return (
      <span />
    );
  },

  handleAlertDismiss: function() {
    if (typeof this.props.dismissable === "function") {
      this.props.dismissable();
    }
    this.setState({alertVisible: false});
  }
});

var SuccessAlert = React.createClass({
  render: function() {
    return (
      <Alert bsStyle="success" alertIcon="fa-check-circle" {...this.props} />
    );
  }
});

var InfoAlert = React.createClass({
  render: function() {
    return (
      <Alert bsStyle="info" alertIcon="fa-info-circle" {...this.props } />
    );
  }
});

var WarningAlert = React.createClass({
  render: function() {
    return (
      <Alert bsStyle="warning" alertIcon="fa-exclamation-triangle" {...this.props } />
    );
  }
});

var ErrorAlert = React.createClass({
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
