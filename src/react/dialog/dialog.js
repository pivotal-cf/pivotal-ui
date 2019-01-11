import React from 'react';
import DomHelpers from '../helpers/dom_helpers';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class Dialog extends React.PureComponent {
  static propTypes = {
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.string,
    ariaLabelledBy: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    dialogClassName: PropTypes.string,
    hideOnBackdropClick: PropTypes.bool,
    hideOnEscKeyDown: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    title: PropTypes.node,
    width: PropTypes.string,
    updateParentZIndex: PropTypes.bool
  };

  static defaultProps = {
    animationDuration: 200,
    animationEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  static ESC_KEY = 27;
  static TAB_KEY = 9;

  state = {visible: false};

  hide = () => this.props.onHide();

  setParentZIndex = zIndex => {
    if (!this.props.updateParentZIndex || !this.el.parentNode) return;
    this.el.parentNode.style.zIndex = `${zIndex}`;
  };

  closeDialog = () => {
    this.setState({visible: false}, () => this.setParentZIndex(-1000));
    this.setBodyScrolling(true);
  };

  openDialog = () => {
    this.setBodyScrolling(false);
    this.setState({visible: true}, () => {
      const tabbableEls = DomHelpers.findTabbableElements(this.dialog) || [];
      tabbableEls[0] && tabbableEls[0].focus();
      this.setParentZIndex(1000);
    });
  };

  setBodyScrolling = canScroll => {
    if (canScroll) {
      return DomHelpers.enableBodyScrolling({overflow: this.savedOverflow, document: global.document});
    }
    this.savedOverflow = DomHelpers.disableBodyScrolling(global.document);
  };

  onBackdropClick = ({target}) => (target === this.backdrop) && this.props.hideOnBackdropClick && this.hide();

  onKeyDown = e => {
    const {hideOnEscKeyDown} = this.props;

    if (hideOnEscKeyDown && e.keyCode === Dialog.ESC_KEY) return this.hide();
    if (e.keyCode !== Dialog.TAB_KEY) return;

    const tabbableElements = DomHelpers.findTabbableElements(this.dialog) || [];
    if (!tabbableElements.length) return;

    const maxTabIndex = tabbableElements.length - 1;
    const lastTabbableEl = tabbableElements[e.shiftKey ? 0 : maxTabIndex];
    const focused = DomHelpers.getActiveElement();

    if (focused !== lastTabbableEl && Array.from(tabbableElements).indexOf(focused) !== -1) return;

    e.preventDefault();
    const firstTabbableEl = tabbableElements[e.shiftKey ? maxTabIndex : 0];
    firstTabbableEl.focus();
  };

  componentDidMount() {
    require('../../css/dialog');
    this.setParentZIndex(-1000);
    if (!this.props.show) return;
    global.document.addEventListener('keydown', this.onKeyDown);
    this.lastFocusedElement = DomHelpers.getActiveElement();
    this.openDialog();
  }

  componentDidUpdate(oldProps) {
    const {show, animationDuration} = this.props;
    if (oldProps.show === show) return;

    if (show) {
      global.document.addEventListener('keydown', this.onKeyDown);
      this.lastFocusedElement = DomHelpers.getActiveElement();
      DomHelpers.clearTimeout(this.closingTimeout);
      this.openDialog();
      return;
    }

    global.document.removeEventListener('keydown', this.onKeyDown);
    this.lastFocusedElement && this.lastFocusedElement.focus();
    this.closingTimeout = animationDuration <= 0
      ? this.closeDialog()
      : DomHelpers.setTimeout(this.closeDialog, animationDuration);
  }

  componentWillUnmount() {
    this.setBodyScrolling(true);
  }

  render() {
    const {show, animationDuration, animationEasing, className, dialogClassName, ariaLabelledBy, width, children} = this.props;
    const {visible} = this.state;

    const disableAnimation = animationDuration <= 0;

    const visibility = visible ? 'visible' : 'hidden';

    const backdropStyle = {visibility};
    const dialogStyle = {width};
    if (!disableAnimation) {
      backdropStyle.transition = `opacity ${animationDuration}ms ${animationEasing} 0s`;
      dialogStyle.transition = `transform ${animationDuration}ms ${animationEasing} 0s`;
    }

    return (
      <div className={classnames('pui-dialog-container', {
        'pui-dialog-visible': visible
      })} ref={el => this.el = el}>
        <div {...{
          className: classnames('pui-dialog-backdrop', {
            'pui-dialog-show': show
          }, className),
          style: backdropStyle,
          onClick: this.onBackdropClick,
          'aria-hidden': !show,
          ref: el => this.backdrop = el
        }}>
          <div {...{
            role: 'dialog',
            'aria-labelledby': ariaLabelledBy,
            ref: el => this.dialog = el,
            className: classnames('pui-dialog', {'pui-dialog-show': show}, dialogClassName),
            style: dialogStyle
          }}>
            {visible && children}
          </div>
        </div>
      </div>
    );
  }
}