import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from 'pui-react-helpers';
import {Icon} from 'pui-react-iconography';
import 'pui-css-alerts';

class Alert extends React.PureComponent {
  static propTypes = {
    alertIcon: PropTypes.string,
    bsStyle: PropTypes.string,
    closeLabel: PropTypes.node,
    dismissable: PropTypes.bool,
    onDismiss: PropTypes.func,
    show: PropTypes.bool,
    withIcon: PropTypes.bool
  };

  static defaultProps = {
    closeLabel: 'Close alert',
    dismissable: false,
    withIcon: false
  };

  constructor(props, context) {
    super(props, context);
    this.state = {alertVisible: true};
  };

  handleAlertDismiss = () => {
    const {onDismiss} = this.props;
    if (this.props.onDismiss) onDismiss();
    this.setState({alertVisible: false});
  };

  render() {
    let {alertIcon, bsStyle, children, closeLabel, dismissable, onDismiss: __ignore, show, withIcon, ...others} = this.props;

    const props = mergeProps(others, {
      role: 'alert',
      className: classnames('alert', `alert-${bsStyle}`, {'alert-dismissable': dismissable})
    });

    const visible = typeof show === 'undefined' ? this.state.alertVisible : show;

    if (!visible) return <span/>;

    let iconColumn;
    if (withIcon) {
      iconColumn = <div className="col col-fixed pan mtm"><Icon src={alertIcon}/></div>;
    }

    let dismissableColumn;
    if (dismissable) {
      dismissableColumn = (
        <div className="col col-fixed pan">
          <button type="button" className="btn close" aria-label={closeLabel} onClick={this.handleAlertDismiss}><Icon
            src="close"/>
          </button>
        </div>
      );
    }

    return (
      <div {...props}>
        <div className="grid">
          {iconColumn}
          <div className="col col-middle">{children}</div>
          {dismissableColumn}
        </div>
      </div>
    );
  }
}

const defAlert = props => {
  return class extends React.Component {
    static propTypes = {
      dismissable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      withIcon: PropTypes.bool
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
