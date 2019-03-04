import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from '../helpers';
import {Icon} from '../iconography';
import {DefaultButton} from '../buttons';

class Alert extends React.PureComponent {
  static propTypes = {
    alertIcon: PropTypes.string,
    closeLabel: PropTypes.node,
    dismissable: PropTypes.bool,
    kind: PropTypes.oneOf(['success', 'danger', 'info', 'warning']),
    label: PropTypes.string,
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
    let {
      alertIcon,
      kind,
      children,
      closeLabel,
      dismissable,
      label,
      onDismiss: __ignore,
      show,
      withIcon,
      ...others
    } = this.props;

    const props = mergeProps(others, {
      role: 'alert',
      className: classnames(
        'pui-alert',
        `pui-alert-${kind}`,
        {'pui-alert-dismissable': dismissable})
    });

    const visible = typeof show === 'undefined' ? this.state.alertVisible : show;

    if (!visible) return <span/>;

    let iconColumn;
    if (withIcon) {
      iconColumn = (
        <div className="col col-fixed col-middle pan">
          <Icon src={alertIcon}/>
        </div>
      );
    }

    let dismissableColumn;
    if (dismissable) {
      dismissableColumn = (
        <div className="col col-fixed col-middle pan">
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
          <div className="col col-middle">
            <div>
              {label && <span className="em-high">{label}: </span>}
              {children}
            </div>
          </div>
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
      return <Alert {...props} {...this.props} />;
    }
  };
};

export const SuccessAlert = defAlert({kind: 'success', alertIcon: 'check_circle', label: 'Success'});
export const InfoAlert = defAlert({kind: 'info', alertIcon: 'info', label: 'Info'});
export const WarningAlert = defAlert({kind: 'warning', alertIcon: 'warning', label: 'Warning'});
export const ErrorAlert = defAlert({kind: 'danger', alertIcon: 'report', label: 'Error'});
