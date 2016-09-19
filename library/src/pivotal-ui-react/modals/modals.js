const Animation = require('pui-react-mixins/mixins/animation_mixin');
const classnames = require('classnames');
const React = require('react');
const mixin = require('pui-react-mixins');
const {mergeProps} = require('pui-react-helpers');

require('pui-css-modals');

const types = React.PropTypes;

const ESC_KEY = 27;

const privates = new WeakMap();

class BaseModal extends mixin(React.Component).with(Animation) {
  static propTypes = {
    animation: types.bool,
    bsSize: types.string,
    dialogClassName: types.string,
    keyboard: types.bool,
    onEntered: types.func,
    onExited: types.func,
    onHide: types.func,
    show: types.bool,
    title: types.string
  };

  static defaultProps = {
    animation: true,
    keyboard: true,
    onHide() {
    }
  };

  static ANIMATION_TIME = 300;
  static ESC_KEY = ESC_KEY;

  constructor(props, context) {
    super(props, context);
    privates.set(this, {fractionShown: 0});
  }

  modalClicked = (e) => {
    if(!this.dialog) return;
    if(this.dialog.contains(e.target)) return;
    this.props.onHide();
  };

  onKeyDown = (e) => {
    if(this.props.keyboard && e.keyCode === ESC_KEY){
      this.props.onHide();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  focus() {
    setTimeout(() => {
      this.modal && this.modal.focus();
    }, 1);
  }

  render() {
    const {
      animation,
      bsSize,
      children,
      dialogClassName,
      keyboard: __ignore,
      onEntered,
      onExited,
      onHide,
      show,
      title,
      ...modalProps
    } = this.props;

    const animationTime = animation ?  BaseModal.ANIMATION_TIME : 0;

    const fractionDestination = show ? 1 : 0;
    const {fractionShown: oldFractionShown} = privates.get(this);
    const fractionShown = this.animate('fractionShown', fractionDestination, animationTime, {startValue: 0, easing: 'easeOutQuad'});
    privates.set(this, {...privates.get(this), fractionShown});

    if (oldFractionShown < 1 && fractionShown === 1) {
      this.focus();
      onEntered && onEntered();
    }

    if (oldFractionShown > 0 && fractionShown === 0) {
      onExited && onExited();
    }

    if (fractionShown === 0 && !show) return null;

    const props = mergeProps(modalProps, {
      className: 'modal fade in',
      role: 'dialog',
      style: {display: 'block'},
      onClick: this.modalClicked,
      tabIndex: -1
    });

    const dialogStyle = {
      marginTop: `${50 * fractionShown}px`
    };

    const modalSize = {small: 'sm', sm: 'sm', large: 'lg', lg: 'lg'}[bsSize];
    const modalSizeClass = `modal-${modalSize}`;

    return (
      <div className="modal-wrapper" role="dialog" style={{opacity: fractionShown}}>
        <div className="modal-backdrop fade in" onClick={onHide}/>
        <div {...props} ref={(ref) => {this.modal = ref;}}>
          <div className={classnames('modal-dialog', dialogClassName, {[modalSizeClass]: modalSize})} style={dialogStyle} ref={(ref) => {this.dialog = ref;}}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" aria-label="close" onClick={onHide}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">{title}</h4>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {isVisible: false};
  }

  open = () => {
    this.setState({isVisible: true});
  };

  close = () => {
    this.setState({isVisible: false});
  };

  render() {
    return (
      <BaseModal show={this.state.isVisible} onHide={this.close} {...this.props} />
    );
  }
}

class ModalBody extends React.Component {
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-body'})}>{this.props.children}</div>;
  }
}

class ModalFooter extends React.Component {
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-footer'})}>{this.props.children}</div>;
  }
}

module.exports = {Modal, ModalBody, ModalFooter, BaseModal};
