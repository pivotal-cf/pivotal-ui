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
      it('adds the key up event listener', function() {
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

    function itOpensTheModal() {
      it('renders a modal', function() {
        expect('.modal').toExist();
        expect('.modal .modal-header').toContainText('What a Header!');
        expect('.modal .modal-body').toContainText('Text in a body');
        expect('.modal .modal-footer').toContainText('Text in a footer');
      });

      it('adds the modal-open class to the body', () => {
        expect('body').toHaveClass('modal-open');
      });

      it('renders a modal-backdrop', function() {
        expect('.modal-backdrop').toExist();
      });
    }

    function itKeepsTheModalOpen() { itOpensTheModal(); }

    function itClosesTheModal() {
      it('closes the modal', function() {
        expect('.modal').not.toExist();
      });

      it('removes the modal-backdrop', function() {
        expect('.modal-backdrop').not.toExist();
      });

      it('removes the modal-open class from the body', function() {
        expect('body').not.toHaveClass('modal-open');
      });
    }

    describe('clicking on the modal trigger', function() {
      beforeEach(function() {
        $('#openButton').simulate('click');
      });

      itOpensTheModal();

      describe('pressing any key', function() {
        describe('for the escape key', function() {
          beforeEach(function() {
            document.body.addEventListener.calls.mostRecent().args[1]({keyCode: 27});
          });

          itClosesTheModal();
        });

        describe('any other key', function() {
          beforeEach(function() {
            document.body.addEventListener.calls.mostRecent().args[1]({keyCode: 13});
          });

          itKeepsTheModalOpen();
        });
      });

      describe('clicking on the X in the header', function() {
        beforeEach(function() {
          $('.modal button.close').simulate('click');
        });

        itClosesTheModal();

        describe('opening the modal again', function() {
          beforeEach(function() {
            $('#openButton').simulate('click');
          });

          itOpensTheModal();
        });
      });

      describe('clicking inside the modal-dialog', function() {
        beforeEach(function() {
          $('.modal-dialog').simulate('click');
        });

        itKeepsTheModalOpen();
      });

      describe('clicking outside the modal-dialog', function() {
        beforeEach(function() {
          $('.modal').simulate('click');
        });

        itClosesTheModal();
      });

      describe('clicking the close button', function() {
        beforeEach(function() {
          $('#closeButton').simulate('click');
        });

        itClosesTheModal();
      });
    });
  });
});


