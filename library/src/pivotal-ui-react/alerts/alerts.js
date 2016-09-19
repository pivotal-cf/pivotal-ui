const classnames = require('classnames');
const React = require('react');
const types = React.PropTypes;
const {Media} = require('pui-react-media');
const {mergeProps} = require('pui-react-helpers');
require('pui-css-alerts');

class Alert extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {alertVisible: true};
  }

  static propTypes = {
    alertIcon: types.string,
    bsStyle: types.string,
    closeLabel: types.node,
    dismissable: types.bool,
    onDismiss: types.func,
    show: types.bool,
    withIcon: types.bool
  };

  static defaultProps = {
    closeLabel: 'Close alert',
    dismissable: false,
    withIcon: false
  };

  render() {
    let {
      alertIcon,
      bsStyle,
      children,
      closeLabel,
      dismissable,
      onDismiss: __ignore,
      show,
      withIcon,
      ...others
    } = this.props;

    const props = mergeProps(others, {role: 'alert',
      className: classnames('alert', `alert-${bsStyle}`, {'alert-dismissable': dismissable})});

    const visible = typeof show === 'undefined' ? this.state.alertVisible : show;

    if (!visible) {
      return <span/>;
    }

    if (withIcon) {
      const icon = <i className={`fa ${alertIcon}`}></i>;
      children = <Media className={'mtn'} image={icon}>{children}</Media>;
    }
    return (
      <div {...props}>
        {dismissable && <button type="button" className="close" aria-hidden={true} onClick={this.handleAlertDismiss}><span>&times;</span></button>}
        {children}
        {dismissable && <button type="button" className="close sr-only">{closeLabel}</button>}
      </div>
    );

  }

  handleAlertDismiss = () => {
    var {onDismiss} = this.props;
    if (onDismiss) this::onDismiss();
    this.setState({alertVisible: false});
  }
}

function defAlert(props) {
  return class extends React.Component {
    static propTypes = {
      dismissable: types.oneOfType([types.bool, types.func]),
      withIcon: types.bool
    };

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
  }
}

module.exports = {
  SuccessAlert: defAlert({bsStyle: 'success', alertIcon: 'fa-check-circle'}),
  InfoAlert: defAlert({bsStyle: 'info', alertIcon: 'fa-info-circle'}),
  WarningAlert: defAlert({bsStyle: 'warning', alertIcon: 'fa-exclamation-triangle'}),
  ErrorAlert: defAlert({bsStyle: 'danger', alertIcon: 'fa-exclamation-triangle'})
};
