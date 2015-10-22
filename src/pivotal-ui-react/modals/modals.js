var React = require('react/addons');
var {DefaultH4} = require('pui-react-typography');
require('classlist-polyfill');
import {mergeProps} from 'pui-react-helpers';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * @component BaseModal
 * @description Opens a modal window with scrim.
 *
 * @property title {String} Header text for the modal window
 * @property open {Boolean} Whether the modal is opened
 * @property onRequestClose {Function} Triggered by either clicking the "x" button, clicking on the scrim or pressing Escape
 *
 * @example ```js
 * var BaseModal = require('pui-react-modals').BaseModal;
 * var ModalBody = require('pui-react-modals').ModalBody;
 * var ModalFooter = require('pui-react-modals').ModalFooter;
 * var DefaultButton = require('pui-react-buttons').DefaultButton;
 * var MyComponent = React.createClass({
 *   getInitialState() {
 *     return {
 *       open: false
 *     };
 *   },
 *   openModal() {
 *    this.setState({open: true});
 *   },
 *
 *   closeModal() {
 *    this.setState({open: false});
 *   },
 *
 *   render() {
 *     return (
 *      <article>
 *        <DefaultButton onClick={this.openModal}>Click to Open Modal</DefaultButton>
 *
 *        <BaseModal title="Modal Header Text" ref="modal" open={this.state.open} onRequestClose={this.closeModal}>
 *          <ModalBody>Modal Body Text</ModalBody>
 *          <ModalFooter>
 *            <DefaultButton onClick={this.closeModal}>Click to Close Modal</DefaultButton>
 *          </ModalFooter>
 *        </BaseModal>
 *      </article>
 *     );
 *   }
 * });
 * ```
 *
 */

const BaseModal = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    open: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onRequestClose() {}
    };
  },

  componentDidMount() {
    document.body.addEventListener('focus', this.ignoreKey, true);
    document.body.addEventListener('keyup', this.onKeyUp, true);
  },

  componentWillUnmount() {
    document.body.removeEventListener('focus', this.ignoreKey, true);
    document.body.removeEventListener('keyup', this.onKeyUp, true);
  },

  componentWillUpdate(nextProps) {
    if (nextProps.open) {
      document.body.classList.add('modal-open');
    }
    else {
      document.body.classList.remove('modal-open');
    }
  },

  close() {
    this.props.onRequestClose();
  },

  childrenClick(e) {
    if (e.target === this.refs.modal.getDOMNode()) {
      this.close();
    }
  },

  ignoreKey(e) {
    if (this.props.open && (!(React.findDOMNode(this.refs.modalTransitions).contains(e.target)))) {
      e.preventDefault();
      React.findDOMNode(this.refs.modalTransitions).focus();
    }
  },

  onKeyUp(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  },

  render() {
    const {open, title, children, ...modalProps} = this.props;
    let modal = null;
    let backdrop = null;

    if (open) {
      modal = (
        <div className="modal modal-basic" style={{ display: 'block'}} key="bananas" ref="modal"
             onClick={this.childrenClick} role="dialog">
          <div className="modal-dialog">
            <div {...mergeProps(modalProps, {className: 'modal-content'})}>
              <div className="modal-header">
                <button type="button" className="close" onClick={this.close}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <DefaultH4 className="modal-title" id="modalTitle">{title}</DefaultH4>
              </div>
              {children}
            </div>
          </div>
        </div>
      );
      backdrop = (<div className="modal-backdrop in" key="tangerine" onClick={this.close}></div>);
    }

    return (
      <div tabIndex="-1" ref="modalTransitions" aria-labelledby="modalTitle">
        <ReactCSSTransitionGroup transitionName="modal-backdrop-fade">{backdrop}</ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup transitionName="modal-fade">{modal}</ReactCSSTransitionGroup>
      </div>
    );
  }
});

/**
 * @component Modal
 * @description Opens a modal window with scrim. The modal can be closed by either clicking the "x" button, clicking on the scrim, pressing Escape, or calling `modal#close` as in the example.
 *
 * @property title {String} Header text for the modal window
 *
 * @example ```js
 * var Modal = require('pui-react-modals').Modal;
 * var ModalBody = require('pui-react-modals').ModalBody;
 * var ModalFooter = require('pui-react-modals').ModalFooter;
 * var DefaultButton = require('pui-react-buttons').DefaultButton;
 * var MyComponent = React.createClass({
 *   openModal() {
 *    this.refs.modal.open();
 *   },
 *
 *   closeModal() {
 *     this.refs.modal.close();
 *   },
 *
 *   render() {
 *     return (
 *      <article>
 *        <DefaultButton onClick={this.openModal}>Click to Open Modal</DefaultButton>
 *
 *        <Modal title="Modal Header Text" ref="modal">
 *          <ModalBody>Modal Body Text</ModalBody>
 *          <ModalFooter>
 *            <DefaultButton onClick={this.closeModal}>Click to Close Modal</DefaultButton>
 *          </ModalFooter>
 *        </Modal>
 *      </article>
 *     );
 *   }
 * });
 * ```
 *
 */
var Modal = React.createClass({
  getInitialState() {
    return {isVisible: false};
  },

  open() {
    this.setState({isVisible: true});
  },

  close() {
    this.setState({isVisible: false});
  },

  render() {
    return (
      <BaseModal open={this.state.isVisible} onRequestClose={this.close} {...this.props} />
    );

  }
});

/**
 * @component ModalBody
 * @description Denotes content for the body of a `<Modal>`
 *
 */
var ModalBody = React.createClass({
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-body'})}>{this.props.children}</div>;
  }
});

/**
 * @component ModalFooter
 * @description Denotes content for the footer of a `<Modal>`
 *
 */
var ModalFooter = React.createClass({
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-footer'})}>{this.props.children}</div>;
  }
});

module.exports = {Modal, ModalBody, ModalFooter, BaseModal};
