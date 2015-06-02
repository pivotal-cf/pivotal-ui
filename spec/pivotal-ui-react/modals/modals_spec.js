require('../spec_helper');

describe('Modals', function() {
  var Modal,
    ModalBody,
    ModalFooter,
    DefaultButton;

  beforeEach(function() {
    spyOn(document.body, 'addEventListener');
    spyOn(document.body, 'removeEventListener');

    Modal = require('../../../src/pivotal-ui-react/modals/modals').Modal;
    ModalBody = require('../../../src/pivotal-ui-react/modals/modals').ModalBody;
    ModalFooter = require('../../../src/pivotal-ui-react/modals/modals').ModalFooter;
    DefaultButton = require('../../../src/pivotal-ui-react/buttons/buttons').DefaultButton;
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('default behavior', function() {
    var subject;
    beforeEach(function() {
      var MyModal = React.createClass({
        propTypes: {
          name: React.PropTypes.string
        },

        _openModal: function(){
          this.refs.modal.open();
        },

        _closeModal: function() {
          this.refs.modal.close();
        },

        render: function() {
          return (
            <div>
              <DefaultButton id="openButton" onClick={this._openModal}>Open Modal</DefaultButton>
              <Modal title="What a Header!" ref="modal">
                <ModalBody>Text in a body</ModalBody>
                <ModalFooter>
                  <p>Text in a footer</p>
                  <DefaultButton id="closeButton" onClick={this._closeModal}>Close</DefaultButton>
                </ModalFooter>
              </Modal>
            </div>
          );
        }
      });

      subject = React.render(<MyModal />, root);
    });


    it('is closed by default', function() {
      expect('#root .modal').not.toExist();
    });

    describe('when mounting', function() {
      it('removes the key up event listener', function() {
        expect(document.body.addEventListener).toHaveBeenCalledWith('keyup', subject.refs.modal.onKeyUp, false);
      });
    });

    describe('when unmounting', function() {
      it('removes the key up event listener', function() {
        var onKeyUp = subject.refs.modal.onKeyUp;
        React.unmountComponentAtNode(root);
        expect(document.body.removeEventListener).toHaveBeenCalledWith('keyup', onKeyUp);
      });
    });

    describe('clicking on the modal trigger', function() {
      beforeEach(function() {
        $('#openButton').simulate('click');
      });

      it('renders a modal', function() {
        expect('.modal').toExist();
        expect('.modal').toHaveClass('modal-basic');
        expect('.modal .modal-backdrop').toHaveClass('fade');
        expect('.modal .modal-backdrop').toHaveClass('in');
        expect('.modal .modal-header').toContainText('What a Header!');
        expect('.modal .modal-body').toContainText('Text in a body');
        expect('.modal .modal-footer').toContainText('Text in a footer');
      });

      describe('pressing any key', function() {
        describe('for the escape key', function() {
          it('closes the modal', function() {
            document.body.addEventListener.calls.mostRecent().args[1]({keyCode: 27});
            expect(subject.refs.modal.state.isVisible).toBe(false);
          });
        });

        describe('any other key', function() {
          it('does not close the modal', function() {
            document.body.addEventListener.calls.mostRecent().args[1]({keyCode: 13});
            expect(subject.refs.modal.state.isVisible).toBe(true);
          });
        });
      });

      describe('clicking on the X in the header', function() {
        beforeEach(function() {
          $('.modal button.close').simulate('click');
        });

        it('closes the modal', function() {
          expect(subject.refs.modal.state.isVisible).toBe(false);
        });

        describe('opening the modal again', function() {
          beforeEach(function() {
            $('#openButton').simulate('click');
          });

          it('opens the modal', function() {
            expect(subject.refs.modal.state.isVisible).toBe(true);
          });
        });
      });

      describe('clicking on the modal backdrop', function() {
        beforeEach(function() {
          $('.modal .modal-backdrop').simulate('click');
        });

        it('closes the modal', function() {
          expect(subject.refs.modal.state.isVisible).toBe(false);
        });
      });

      describe('clicking the close button', function() {
        beforeEach(function() {
          $('#closeButton').simulate('click');
        });

        it('closes the modal', function() {
          expect(subject.refs.modal.state.isVisible).toBe(false);
        });
      });
    });
  });
});


