'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Modal = require('../../../src/pivotal-ui/javascripts/modals.jsx').Modal;
var ModalBody = require('../../../src/pivotal-ui/javascripts/modals.jsx').ModalBody;
var ModalFooter = require('../../../src/pivotal-ui/javascripts/modals.jsx').ModalFooter;
var DefaultButton = require('../../../src/pivotal-ui/javascripts/buttons.jsx').DefaultButton;

describe('Modals', function() {
  beforeEach(function() {
    $('<style>.fade,.fade-enter,.fade-leave{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade-enter-active.fade-leave,.fade-enter.fade-enter-active,.fade.fade-enter-active,.fade.in,.in.fade-enter,.in.fade-leave{opacity:1}.collapse{display:none;visibility:hidden}.collapse.fade-enter-active,.collapse.in{display:block;visibility:visible}tr.collapse.fade-enter-active,tr.collapse.in{display:table-row}tbody.collapse.fade-enter-active,tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition-property:height,visibility;transition-property:height,visibility;-webkit-transition-duration:.35s;transition-duration:.35s;-webkit-transition-timing-function:ease;transition-timing-function:ease}</style>').appendTo('body');
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  describe('default behavior', function() {
    beforeEach(function() {
      var MyModal = React.createClass({
        _openModal: function(){
          this.refs.modal.open();
        },

        _closeModal: function() {
          this.refs.modal.close();
        },

        render: function() {
          return (
            <div>
              <DefaultButton id='openButton' onClick={this._openModal}>Open Modal</DefaultButton>
              <Modal title='What a Header!' ref='modal'>
                <ModalBody>Text in a body</ModalBody>
                <ModalFooter>
                  <p>Text in a footer</p>
                  <DefaultButton id='closeButton' onClick={this._closeModal}>Close</DefaultButton>
                </ModalFooter>
              </Modal>
            </div>
          )
        }
      });

      React.render(<MyModal />, this.node);
    });


    it('is closed by default', function() {
      expect($('#container .modal')).not.toExist();
    });

    describe('clicking on the modal trigger', function() {
      beforeEach(function(done) {
        TestUtils.Simulate.click($('#container button#openButton').get(0));
        setTimeout(function() {
          done();
        }, 1000);
      });

      it('renders a modal', function() {
        expect($('.modal')).toExist();
        expect($('.modal')).toHaveClass('modal-basic');
        expect($('.modal .modal-backdrop')).toHaveClass('fade in');
        expect($('.modal .modal-header')).toContainText('What a Header!');
        expect($('.modal .modal-body')).toContainText('Text in a body');
        expect($('.modal .modal-footer')).toContainText('Text in a footer');
      });

      describe('clicking on the X in the header', function() {
        beforeEach(function(done) {
          TestUtils.Simulate.click($('.modal button.close').get(0));
          setTimeout(function() {
            done();
          }, 1000);
        });

        it('closes the modal', function() {
          expect($('#container .modal')).not.toExist();
        });

        describe('opening the modal again', function() {
          beforeEach(function() {
            TestUtils.Simulate.click($('#container button#openButton').get(0));
          });

          it('closes the modal', function() {
            expect($('.modal')).toExist();
          });
        });
      });

      describe('clicking the close button', function() {
        beforeEach(function(done) {
          TestUtils.Simulate.click($('.modal button#closeButton').get(0));
          setTimeout(function() {
            done();
          }, 1000);
        });

        it('closes the modal', function() {
          expect($('#container .modal')).not.toExist();
        });
      });
    });
  });
});


