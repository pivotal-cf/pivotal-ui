require('../spec_helper');

describe('Alert', function() {
  var SuccessAlert;
  beforeEach(function() {
    SuccessAlert = require('../../../src/pivotal-ui-react/alerts/alerts').SuccessAlert;
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('when dismissable is set to true', function() {
    beforeEach(function() {
      React.render(<SuccessAlert dismissable={true}>alert body</SuccessAlert>, root);
    });

    it('has a close button', function() {
      expect('button.close').toExist();
    });

    it('disappears when close button is clicked', function() {
      $('button.close').simulate('click');
      expect('#root .alert').not.toExist();
    });
  });

  describe('when dismissable is set to a callback', function() {
    beforeEach(function() {
      this.callback = jasmine.createSpy('dismissable callback');
      React.render(<SuccessAlert dismissable={this.callback}>alert body</SuccessAlert>, root);
    });

    it('has a close button', function() {
      expect('button.close').toExist();
    });

    describe('when close button is clicked', function() {
      beforeEach(function() {
        $('button.close').simulate('click');
      });

      it('disappears', function() {
        expect('#root .alert').not.toExist();
      });

      it('calls the callback passed in', function() {
        expect(this.callback).toHaveBeenCalled();
      });
    });
  });

  describe('when dismissable is not present', function() {
    beforeEach(function() {
      React.render(<SuccessAlert>alert body</SuccessAlert>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('does not have a close button', function() {
      expect('button.close').not.toExist();
    });
  });
});

describe('SuccessAlert', function() {
  describe('when withIcon is set to true', function() {
    beforeEach(function() {
      var SuccessAlert = require('../../../src/pivotal-ui-react/alerts/alerts').SuccessAlert;
      React.render(<SuccessAlert withIcon>alert body</SuccessAlert>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('renders an icon in the alert', function() {
      expect('i').toHaveClass('fa-check-circle');
    });
  });
});

describe('InfoAlert', function() {
  describe('when withIcon is set to true', function() {
    beforeEach(function() {
      var InfoAlert = require('../../../src/pivotal-ui-react/alerts/alerts').InfoAlert;
      React.render(<InfoAlert withIcon>alert body</InfoAlert>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('renders an icon in the alert', function() {
      expect('i').toHaveClass('fa-info-circle');
    });
  });
});

describe('WarningAlert', function() {
   describe('when withIcon is set to true', function() {
     beforeEach(function() {
       var WarningAlert = require('../../../src/pivotal-ui-react/alerts/alerts').WarningAlert;
       React.render(<WarningAlert withIcon>alert body</WarningAlert>, root);
     });

     afterEach(function() {
       React.unmountComponentAtNode(root);
     });

     it('renders an icon in the alert', function() {
       expect('i').toHaveClass('fa-exclamation-triangle');
     });
   });
});

describe('ErrorAlert', function() {
   describe('when withIcon is set to true', function() {
     beforeEach(function() {
       var ErrorAlert = require('../../../src/pivotal-ui-react/alerts/alerts').ErrorAlert;
       React.render(<ErrorAlert withIcon>alert body</ErrorAlert>, root);
     });

     afterEach(function() {
       React.unmountComponentAtNode(root);
     });

     it('renders an icon in the alert', function() {
       expect('i').toHaveClass('fa-exclamation-triangle');
     });
   });
});
