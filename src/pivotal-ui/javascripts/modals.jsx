'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Modal = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return ({
      isVisible: false
    });
  },

  open: function () {
    this.setState({
      isVisible: true
    });
  },

  close: function () {
    this.setState({
      isVisible: false
    });
  },

  render: function () {
    var height = window.innerHeight;
    var modalInnards;

    if (!this.state.isVisible) {
      modalInnards = null;
    } else {
      modalInnards = (
        <div className="modal modal-basic" style={{display: "block"}} key="bananas">
          <div className="modal-backdrop fade in" style={{height: height}}></div>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={this.close}>
                  <span>×</span>
                  <span className="sr-only">Close</span>
                </button>
                {this.props.title}
              </div>
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }

    return (
      <ReactCSSTransitionGroup transitionName='fade'>
        {modalInnards}
      </ReactCSSTransitionGroup>
    );
  }
});

var ModalBody = React.createClass({
  render: function () {
    return (
      <div className='modal-body'>{this.props.children}</div>
    );
  }
});

var ModalFooter = React.createClass({
  render: function () {
    return (
      <div className='modal-footer'>{this.props.children}</div>
    );
  }
});

module.exports = {
  Modal: Modal,
  ModalBody: ModalBody,
  ModalFooter: ModalFooter
};
