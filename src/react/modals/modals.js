import React, {PureComponent, Fragment} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash.uniqueid';
import DomHelpers from '../helpers/dom-helpers';
import {mergeProps} from '../helpers';
import {Icon} from '../iconography';
import {DefaultButton} from '../buttons';

export class BaseModal extends PureComponent {
  static propTypes = {
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.string,
    className: PropTypes.string,
    dialogClassName: PropTypes.string,
    disableAnimation: PropTypes.bool,
    getActiveElement: PropTypes.func,
    onHide: PropTypes.func,
    size: PropTypes.string,
    show: PropTypes.bool,
    title: PropTypes.node
  };

  static defaultProps = {
    animationDuration: 300,
    animationEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    getActiveElement: () => global.document.activeElement
  };

  static sizeClasses = {
    sm: 'pui-modal-sm',
    small: 'pui-modal-sm',
    lg: 'pui-modal-lg',
    large: 'pui-modal-lg'
  };

  static ESC_KEY = 27;
  static TAB_KEY = 9;

  modalRoot = global.document.createElement('div');
  titleId = uniqueId('pui-modal-title');
  state = {visible: false};

  hide = () => this.props.onHide && this.props.onHide();

  closeDialog = () => {
    this.setState({visible: false});
    this.toggleBodyScrolling(true);
  };

  openDialog = () => {
    this.toggleBodyScrolling(false);
    this.setState({visible: true}, () => {
      const tabbableEls = DomHelpers.findTabbableElements(this.modalRoot) || [];
      tabbableEls[0] && tabbableEls[0].focus();
    });
  };

  toggleBodyScrolling = canScroll => {
    if (canScroll) {
      DomHelpers.enableBodyScrolling({
        paddingRight: this.savedPadding, overflow: this.savedOverflow,
        document: global.document
      });
    } else {
      const {paddingRight, overflow} = DomHelpers.disableBodyScrolling(global.document);
      this.savedPadding = paddingRight;
      this.savedOverflow = overflow;
    }
  };

  onBackdropClick = evt => {
    if (evt.target !== this.backdrop) return;
    this.hide();
  };

  onKeyDown = evt => {
    if (evt.keyCode === BaseModal.ESC_KEY) return this.hide();

    if (evt.keyCode === BaseModal.TAB_KEY) {
      const tabbableElements = DomHelpers.findTabbableElements(this.modalRoot) || [];
      if (!tabbableElements.length) return;

      const maxTabIndex = tabbableElements.length - 1;
      const lastTabbableEl = tabbableElements[evt.shiftKey ? 0 : maxTabIndex];
      const firstTabbableEl = tabbableElements[evt.shiftKey ? maxTabIndex : 0];
      const focused = this.props.getActiveElement();

      if (focused === lastTabbableEl || focused === global.document.body) {
        evt.preventDefault();
        firstTabbableEl && firstTabbableEl.focus();
      }
    }
  };

  componentDidMount() {
    require('../../css/modals');
    if (typeof global.document === 'undefined') return;
    global.document.body.appendChild(this.modalRoot);
  }

  componentDidUpdate(oldProps) {
    if (typeof global.document === 'undefined') return;
    const {show, disableAnimation, animationDuration} = this.props;
    if (oldProps.show === show) return;

    if (!show) {
      global.document.removeEventListener('keydown', this.onKeyDown);
      this.lastFocusedElement && this.lastFocusedElement.focus();
      this.closingTimeout = disableAnimation
        ? this.closeDialog()
        : setTimeout(this.closeDialog, animationDuration);
      return;
    }

    global.document.addEventListener('keydown', this.onKeyDown);
    this.lastFocusedElement = this.props.getActiveElement();
    this.closingTimeout && clearTimeout(this.closingTimeout);
    this.openDialog();
  }

  componentWillUnmount() {
    if (typeof global.document === 'undefined') return;
    global.document.body.removeChild(this.modalRoot);
    this.toggleBodyScrolling(true);
  }

  render() {
    const {
      disableAnimation, show, animationDuration, animationEasing, className, dialogClassName, title,
      size, children
    } = this.props;
    const {visible} = this.state;

    const backdropTransition = !disableAnimation && `opacity ${animationDuration}ms ${animationEasing}`;
    const wrapperTransition = !disableAnimation && `transform ${animationDuration}ms ${animationEasing}`;
    const visibility = visible ? 'visible' : 'hidden';
    const sizeClass = BaseModal.sizeClasses[size];
    const width = sizeClass ? null : size;

    return createPortal(
      <div {...{
        className: classnames('pui-modal-backdrop', show && 'pui-modal-show', className),
        style: {visibility, transition: backdropTransition},
        onClick: this.onBackdropClick,
        'aria-hidden': !show,
        ref: el => this.backdrop = el
      }}>
        <div {...{
          role: 'dialog',
          'aria-labelledby': this.titleId,
          className: classnames('pui-modal-dialog', show && 'pui-modal-show', dialogClassName, sizeClass),
          style: {transition: wrapperTransition, width}
        }}>
          {visible && (
            <Fragment>
              <div className="pui-modal-header">
                <h3 className="pui-modal-title em-high" id={this.titleId}>{title}</h3>
              </div>
              {children}
            </Fragment>
          )}
          <DefaultButton flat iconOnly {...{
            className: 'pui-modal-close-btn',
            'aria-label': 'Close',
            onClick: this.hide,
            icon: <Icon src="close"/>
          }}/>
        </div>
      </div>,
      this.modalRoot
    );
  }
}

export class ModalBody extends PureComponent {
  componentDidMount() {
    require('../../css/modals');
  }

  render() {
    return <div {...mergeProps(this.props, {className: 'pui-modal-body'})}>{this.props.children}</div>;
  }
}

export class ModalFooter extends PureComponent {
  componentDidMount() {
    require('../../css/modals');
  }

  render() {
    return <div {...mergeProps(this.props, {className: 'pui-modal-footer'})}>{this.props.children}</div>;
  }
}
