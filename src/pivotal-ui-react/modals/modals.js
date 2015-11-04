var React = require('react');
var {DefaultH4} = require('pui-react-typography');
import {mergeProps} from 'pui-react-helpers';

const BsModal = require('react-bootstrap/lib/Modal');
const BsModalHeader = require('react-bootstrap/lib/ModalHeader');

/**
 * @component BaseModal
 * @description Opens a modal window with scrim.
 *
 * @property title {String} Header text for the modal window
 * @property show {Boolean} Whether the modal is opened
 * @property onHide {Function} Triggered by either clicking the "x" button, clicking on the scrim or pressing Escape
 *
 * @example ```js
 * var BaseModal = require('pui-react-modals').BaseModal;
 * var ModalBody = require('pui-react-modals').ModalBody;
 * var ModalFooter = require('pui-react-modals').ModalFooter;
 * var DefaultButton = require('pui-react-buttons').DefaultButton;
 * var MyComponent = React.createClass({
 *   getInitialState() {
 *     return {
 *       show: false
 *     };
 *   },
 *   openModal() {
 *    this.setState({show: true});
 *   },
 *
 *   closeModal() {
 *    this.setState({show: false});
 *   },
 *
 *   render() {
 *     return (
 *      <article>
 *        <DefaultButton onClick={this.openModal}>Click to Open Modal</DefaultButton>
 *
 *        <BaseModal title="Modal Header Text" ref="modal" show={this.state.show} onHide={this.closeModal}>
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
    show: React.PropTypes.bool,
    onHide: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onHide() {}
    };
  },

  render() {
    const {show, title, children, onHide, ...modalProps} = this.props;

    return (
      <BsModal show={show} onHide={onHide} {...mergeProps(modalProps, {className: 'modal-basic'})}>
        <BsModalHeader className="modal-header" closeButton>
          <DefaultH4 className="modal-title" id="modalTitle">{title}</DefaultH4>
        </BsModalHeader>
        {children}
      </BsModal>
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
const Modal = React.createClass({
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
      <BaseModal show={this.state.isVisible} onHide={this.close} {...this.props} />
    );

  }
});

/**
 * @component ModalBody
 * @description Denotes content for the body of a `<Modal>`
 *
 */
const ModalBody = React.createClass({
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-body'})}>{this.props.children}</div>;
  }
});

/**
 * @component ModalFooter
 * @description Denotes content for the footer of a `<Modal>`
 *
 */
const ModalFooter = React.createClass({
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-footer'})}>{this.props.children}</div>;
  }
});

module.exports = {Modal, ModalBody, ModalFooter, BaseModal};
