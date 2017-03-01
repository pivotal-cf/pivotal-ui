import classnames from 'classnames';
import React from 'react';
import {Media} from 'pui-react-media';
import {mergeProps} from 'pui-react-helpers';
import {Icon} from 'pui-react-iconography';
import 'pui-css-alerts';

const types = React.PropTypes;

class Alert extends React.Component {
  static propTypes = {
    alertIcon: types.string,
    bsStyle: types.string,
    closeLabel: types.node,
    dismissable: types.bool,
    onDismiss: types.func,
    show: types.bool,
    withIcon: types.bool
  }

  static defaultProps = {
    closeLabel: 'Close alert',
    dismissable: false,
    withIcon: false
  }

  constructor(props, context) {
    super(props, context);
    this.state = {alertVisible: true};
  }

  handleAlertDismiss = () => {
    const {onDismiss} = this.props;
    if (this.props.onDismiss) onDismiss();
    this.setState({alertVisible: false});
  }

  render() {
    let {alertIcon, bsStyle, children, closeLabel, dismissable, onDismiss: __ignore, show, withIcon, ...others} = this.props;

    const props = mergeProps(others, {
      role: 'alert',
      className: classnames('alert', `alert-${bsStyle}`, {'alert-dismissable': dismissable})
    });

    const visible = typeof show === 'undefined' ? this.state.alertVisible : show;

    if (!visible) return <span/>;

    if (withIcon) {
      const icon = <Icon src={alertIcon}/>;
      children = <Media className={'mtn'} image={icon}>{children}</Media>;
    }

    return (
      <div {...props}>
        {children}
        {dismissable && <button type="button" className="btn close sr-only">{closeLabel}</button>}
        {dismissable &&
        <button type="button" className="btn close" aria-hidden={true} onClick={this.handleAlertDismiss}><Icon src="close"/>
        </button>}
      </div>
    );
  }
}

const defAlert = props => {
  return class extends React.Component {
    static propTypes = {
      dismissable: types.oneOfType([types.bool, types.func]),
      withIcon: types.bool
    };

    render() {
      const {children, ...others} = this.props;
      return (<Alert {...props} {...others}>
          <span className="sr-only">
            {(props.bsStyle === 'danger' ? 'error' : props.bsStyle) + ' alert message,'}
          </span>
        {children}
      </Alert>);
    }
  };
};

export const SuccessAlert = defAlert({bsStyle: 'success', alertIcon: 'check_circle'});
export const InfoAlert = defAlert({bsStyle: 'info', alertIcon: 'info'});
export const WarningAlert = defAlert({bsStyle: 'warning', alertIcon: 'warning'});
export const ErrorAlert = defAlert({bsStyle: 'danger', alertIcon: 'warning'});
