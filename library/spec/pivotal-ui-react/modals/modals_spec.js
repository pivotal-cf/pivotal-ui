require('../spec_helper');

describe('Modals', function() {
  var Modal, modal;

  beforeEach(function() {
    Modal = require('../../../src/pivotal-ui-react/modals/modals').Modal;
    modal = ReactDOM.render(
      <Modal id="yolo" animation={false}> Hi </Modal>,
      root
    );
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('is closed by default', function() {
    expect('#yolo').not.toExist();
  });

  describe('#open', function() {
    it('opens the modal', function() {
      modal.open();

      expect('#yolo').toExist();
    });
  });
  describe('#close', function() {
    beforeEach(function() {
      modal.open();
    });

    it('closes the modal', function() {
      modal.close();

      expect('#yolo').not.toExist();
    });
  });
});

describe('BaseModal', function() {
  let BaseModal;

  beforeEach(function() {
    BaseModal = require('../../../src/pivotal-ui-react/modals/modals').BaseModal;
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  describe('show', function() {
    it('shows the modal', function() {
      ReactDOM.render(
        <BaseModal show id="mr-modal" title="hey mr modal"/>,
        root
      );

      expect('#mr-modal').toExist();
      expect('#mr-modal').toContainText('hey mr modal');
    });

    it('shows the modal', function() {
      ReactDOM.render(
        <BaseModal id="mr-modal" title="hey mr modal"/>,
        root
      );

      expect('#mr-modal').not.toExist();
    });
  });

  describe('onHide', function() {
    let onHide;

    beforeEach(function() {
      onHide = jasmine.createSpy('onHide');
      ReactDOM.render(
        <BaseModal show id="ms-modal" onHide={onHide}/>,
        root
      );
    });

    it('is triggered when close button is clicked', function() {
      $('#ms-modal button.close').simulate('click');

      expect(onHide).toHaveBeenCalled();
    });

    it('is triggered when the overlay is clicked', function() {
      $('.modal').simulate('click');

      expect(onHide).toHaveBeenCalled();
    });
  });
});
