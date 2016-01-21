var React = require('react');
var {DefaultH4} = require('pui-react-typography');
import {mergeProps} from 'pui-react-helpers';

const BsModal = require('react-bootstrap/lib/Modal');
const BsModalHeader = require('react-bootstrap/lib/ModalHeader');


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

const ModalBody = React.createClass({
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-body'})}>{this.props.children}</div>;
  }
});

const ModalFooter = React.createClass({
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-footer'})}>{this.props.children}</div>;
  }
});

module.exports = {Modal, ModalBody, ModalFooter, BaseModal};
