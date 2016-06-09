var React = require('react');
import {mergeProps} from 'pui-react-helpers';
require('pui-css-modals');

const BsModal = require('react-bootstrap/lib/Modal');
const BsModalHeader = require('react-bootstrap/lib/ModalHeader');


class BaseModal extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    show: React.PropTypes.bool,
    onHide: React.PropTypes.func
  };

  static defaultProps = {
    onHide() {}
  };

  render() {
    const {show, title, children, onHide, ...modalProps} = this.props;

    return (
      <BsModal show={show} onHide={onHide} {...modalProps}>
        <BsModalHeader className="modal-header" closeButton>
          <h4 className="modal-title" id="modalTitle">{title}</h4>
        </BsModalHeader>
        {children}
      </BsModal>
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
