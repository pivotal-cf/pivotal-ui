import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash.uniqueid';
import {Icon} from '../iconography';
import {DefaultButton} from '../buttons';
import {Dialog} from '../dialog';

export class Modal extends PureComponent {
  static propTypes = {
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.string,
    bodyClassName: PropTypes.string,
    children: PropTypes.any,
    dialogClassName: PropTypes.string,
    footer: PropTypes.node,
    footerClassName: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    size: PropTypes.string,
    show: PropTypes.bool,
    title: PropTypes.node
  };

  static sizeClasses = {
    sm: 'pui-modal-sm',
    small: 'pui-modal-sm',
    lg: 'pui-modal-lg',
    large: 'pui-modal-lg'
  };

  titleId = uniqueId('pui-modal-title');

  componentDidMount() {
    require('../../css/modal');
  }

  render() {
    const {title, size, children, onHide, dialogClassName, footer, bodyClassName, footerClassName, ...props} = this.props;

    const sizeClass = Modal.sizeClasses[size];
    const mergedDialogClassNames = classnames('pui-modal-dialog', dialogClassName, sizeClass);
    const width = sizeClass ? null : size;
    const dialogProps = {...props, hideOnBackdropClick: true, hideOnEscKeyDown: true, dialogClassName: mergedDialogClassNames, onHide, ariaLabelledBy: this.titleId, className: 'pui-modal-dialog-backdrop'};
    width && (dialogProps.width = width);

    return (
      <Dialog {...dialogProps}>
        <div className="pui-modal-header">
          <h3 className="pui-modal-title em-high" id={this.titleId}>{title}</h3>
        </div>
        <div {...{className: classnames('pui-modal-body', bodyClassName)}}>{children}</div>
        {footer && <div {...{className: classnames('pui-modal-footer', footerClassName)}}>{footer}</div>}
        <DefaultButton {...{
          className: 'pui-modal-close-btn',
          iconOnly: true,
          flat: true,
          'aria-label': 'Close',
          onClick: onHide,
          icon: <Icon src="close"/>
        }}/>
      </Dialog>
    );
  }
}