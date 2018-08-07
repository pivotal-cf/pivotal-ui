import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from '../helpers';
import {Icon} from '../iconography';
import {DefaultButton} from '../buttons';

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
      className: classnames(
        'alert',
        'pui-alert',
        `alert-${bsStyle}`,
        `pui-alert-${bsStyle}`,
        {'alert-dismissable': dismissable},
        {'pui-alert-dismissable': dismissable})
    });

    const visible = typeof show === 'undefined' ? this.state.alertVisible : show;

    if (!visible) return <span/>;

    let iconColumn;
    if (withIcon) {
      iconColumn = <div className="col col-fixed col-middle pan"><Icon src={alertIcon}/></div>;
    }

    let dismissableColumn;
    if (dismissable) {
      dismissableColumn = (
        <div className="col col-fixed pan">
          <DefaultButton {...{
            className: 'pui-alert-close-btn',
            iconOnly: true,
            flat: true,
            'aria-label': closeLabel,
            onClick: this.handleAlertDismiss,
            icon: <Icon src="close"/>
          }}/>
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

    componentDidMount() {
      require('../../css/alerts');
    }

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
export const ErrorAlert = defAlert({bsStyle: 'danger', alertIcon: 'report'});
