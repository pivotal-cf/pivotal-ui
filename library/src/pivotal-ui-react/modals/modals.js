import Animation from 'pui-react-mixins/mixins/animation_mixin';
import classnames from 'classnames';
import React from 'react';
import mixin from 'pui-react-mixins';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-modals';

const types = React.PropTypes;
const ESC_KEY = 27;
const privates = new WeakMap();

function bodyNotAllowedToScroll(document)  {
  if (typeof document !== 'object') return;
  const body = document.getElementsByTagName('body')[0];
  if(!body.classList.contains('pui-no-scroll')) {
    body.classList.add('pui-no-scroll');
  }
}

function bodyIsAllowedToScroll(document) {
  if (typeof document === 'object') document.getElementsByTagName('body')[0].classList.remove('pui-no-scroll');
}

export class BaseModal extends mixin(React.Component).with(Animation) {
  static propTypes = {
    animation: types.bool,
    size: types.string,
    dialogClassName: types.string,
    keyboard: types.bool,
    onEntered: types.func,
    onExited: types.func,
    onHide: types.func,
    show: types.bool,
    title: types.node,
    getDocument: types.func
  }

  static defaultProps = {
    animation: true,
    keyboard: true,
    onHide: () => {},
    getDocument: () => global.document
  };

  static ANIMATION_TIME = 300;
  static ESC_KEY = ESC_KEY;

  constructor(props, context) {
    super(props, context);
    privates.set(this, {fractionShown: 0});
    const document = this.props.getDocument();
    this.props.show ? bodyNotAllowedToScroll(document) : bodyIsAllowedToScroll(document);
  }

  modalClicked = e => {
    if(!this.dialog) return;
    if(this.dialog.contains(e.target)) return;
    this.props.onHide();
  }

  onKeyDown = e => {
    if(this.props.keyboard && e.keyCode === ESC_KEY) {
      this.props.onHide();
    }
  }

  componentDidMount() {
    var document = this.props.getDocument();
    if (typeof document === 'object') document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    var document = this.props.getDocument();
    if (typeof document !== 'object') return;
    document.removeEventListener('keydown', this.onKeyDown);
    bodyIsAllowedToScroll(document);
  }

  focus = () => setTimeout(() => {
    this.modal && this.modal.focus();
  }, 1)

  render() {
    const {
      animation,
      size,
      children,
      dialogClassName,
      keyboard: __ignore1,
      onEntered,
      onExited,
      onHide,
      show,
      title,
      getDocument: __ignore2,
      ...modalProps
    } = this.props;
    this.props.show ? bodyNotAllowedToScroll() : bodyIsAllowedToScroll();

    const animationTime = animation ? BaseModal.ANIMATION_TIME : 0;
    const fractionDestination = show ? 1 : 0;
    const {fractionShown: oldFractionShown} = privates.get(this);
    const fractionShown = this.animate('fractionShown', fractionDestination, animationTime, {
      startValue: 0,
      easing: 'easeOutQuad'
    });

    privates.set(this, {...privates.get(this), fractionShown});

    if(oldFractionShown < 1 && fractionShown === 1) {
      this.focus();
      onEntered && onEntered();
    }

    if(oldFractionShown > 0 && fractionShown === 0) {
      onExited && onExited();
    }

    if(fractionShown === 0 && !show) return null;

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

    const modalSize = {small: 'sm', sm: 'sm', large: 'lg', lg: 'lg'}[size];
    const modalSizeClass = `modal-${modalSize}`;

    return (<div className="modal-wrapper" role="dialog">
      <div className="modal-backdrop fade in" style={{opacity: fractionShown * 0.8}} onClick={onHide}/>
      <div {...props} ref={(ref) => {
        this.modal = ref;
      }}>
        <div className={classnames('modal-dialog', dialogClassName, {[modalSizeClass]: modalSize})}
             style={dialogStyle} ref={(ref) => {
          this.dialog = ref;
        }}>
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
    </div>);
  }
}

export class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {isVisible: false};
  }

  open = () => this.setState({isVisible: true})   // This is required for testing
  close = () => this.setState({isVisible: false}) // This is required for testing

  render() {
    return <BaseModal show={this.state.isVisible} onHide={this.close.bind(this)} {...this.props} />;
  }
}

export class ModalBody extends React.Component {
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-body'})}>{this.props.children}</div>;
  }
}

export class ModalFooter extends React.Component {
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-footer'})}>{this.props.children}</div>;
  }
}
