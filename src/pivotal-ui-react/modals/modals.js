var React = require('react/addons');
var {DefaultH4} = require('pui-react-typography');
require('classlist-polyfill');
import {mergeProps} from 'pui-react-helpers';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#modal_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#modal)
 */
var Modal = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  componentDidMount() {
    document.body.addEventListener('keyup', this.onKeyUp, false);
  },

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.onKeyUp);
  },

  getInitialState() {
    return {isVisible: false};
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isVisible) {
       document.body.classList.add('modal-open');
    }
    else {
       document.body.classList.remove('modal-open');
    }
  },

  open() {
    this.setState({isVisible: true});
  },

  close() {
    this.setState({isVisible: false});
  },

  childrenClick(e) {
    if (e.target === this.refs.modal.getDOMNode()) {
      this.close();
    }
  },

  onKeyUp(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  },

  render() {
    let modal = null;
    let backdrop = null;
    if (this.state.isVisible) {
      modal = (
        <div className="modal modal-basic" style={{ display: 'block'}} key="bananas" ref="modal" onClick={this.childrenClick}>
          <div className="modal-dialog">
            <div {...mergeProps(this.props, {className: 'modal-content'})}>
              <div className="modal-header">
                <button type="button" className="close" onClick={this.close}>
                  <span>×</span>
                  <span className="sr-only">Close</span>
                </button>
                <DefaultH4 className="modal-title">{this.props.title}</DefaultH4>
              </div>
                {this.props.children}
            </div>
          </div>
        </div>
      );
      backdrop = (<div className="modal-backdrop in" key="tangerine" onClick={this.close}></div>);
    }

    return (
      <div>
        <ReactCSSTransitionGroup transitionName="modal-backdrop-fade">{backdrop}</ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup transitionName="modal-fade">{modal}</ReactCSSTransitionGroup>
      </div>
    );

  }
});

/**
 * @component ModalBody
 * @description Denotes content for the body of a `<Modal>`
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#modal_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#modal)
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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#modal_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#modal)
 */
var ModalFooter = React.createClass({
  render() {
    return <div {...mergeProps(this.props, {className: 'modal-footer'})}>{this.props.children}</div>;
  }
});

module.exports = {Modal, ModalBody, ModalFooter};
