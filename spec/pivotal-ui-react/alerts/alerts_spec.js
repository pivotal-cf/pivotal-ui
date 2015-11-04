require('../spec_helper');
const ReactDOM = require('react-dom');

describe('Alert', function() {
  var SuccessAlert;
  beforeEach(function() {
    SuccessAlert = require('../../../src/pivotal-ui-react/alerts/alerts').SuccessAlert;
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('passes down the className, id, and style properties', () => {
    ReactDOM.render(<SuccessAlert className="foo" id="bar" style={{fontSize: '200px'}}>alert body</SuccessAlert>, root);

    expect('#root .alert').toHaveClass('foo');
    expect('#root .alert').toHaveProp('id', 'bar');
    expect('#root .alert').toHaveCss({'font-size': '200px'});
  });

  describe('when dismissable is set to true', function() {
    beforeEach(function() {
      ReactDOM.render(<SuccessAlert dismissable={true}>alert body</SuccessAlert>, root);
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
      ReactDOM.render(<SuccessAlert dismissable={this.callback}>alert body</SuccessAlert>, root);
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
      ReactDOM.render(<SuccessAlert>alert body</SuccessAlert>, root);
    });

    afterEach(function() {
      ReactDOM.unmountComponentAtNode(root);
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
      ReactDOM.render(<SuccessAlert withIcon>alert body</SuccessAlert>, root);
    });

    afterEach(function() {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('renders an icon in the alert', function() {
      expect('i').toHaveClass('fa-check-circle');
    });

    it('has a "success alert" label', function() {
      expect('.alert .sr-only').toContainText('success alert message,');
    });
  });
});

describe('InfoAlert', function() {
  describe('when withIcon is set to true', function() {
    beforeEach(function() {
      var InfoAlert = require('../../../src/pivotal-ui-react/alerts/alerts').InfoAlert;
      ReactDOM.render(<InfoAlert withIcon>alert body</InfoAlert>, root);
    });

    afterEach(function() {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('renders an icon in the alert', function() {
      expect('i').toHaveClass('fa-info-circle');
    });

    it('has a "info alert" label', function() {
      expect('.alert .sr-only').toContainText('info alert message,');
    });
  });
});

describe('WarningAlert', function() {
   describe('when withIcon is set to true', function() {
     beforeEach(function() {
       var WarningAlert = require('../../../src/pivotal-ui-react/alerts/alerts').WarningAlert;
       ReactDOM.render(<WarningAlert withIcon>alert body</WarningAlert>, root);
     });

     afterEach(function() {
       ReactDOM.unmountComponentAtNode(root);
     });

     it('renders an icon in the alert', function() {
       expect('i').toHaveClass('fa-exclamation-triangle');
     });

     it('has a "warning alert" label', function() {
       expect('.alert .sr-only').toContainText('warning alert message,');
     });
   });
});

describe('ErrorAlert', function() {
   describe('when withIcon is set to true', function() {
     beforeEach(function() {
       var ErrorAlert = require('../../../src/pivotal-ui-react/alerts/alerts').ErrorAlert;
       ReactDOM.render(<ErrorAlert withIcon>alert body</ErrorAlert>, root);
     });

     afterEach(function() {
       ReactDOM.unmountComponentAtNode(root);
     });

     it('renders an icon in the alert', function() {
       expect('i').toHaveClass('fa-exclamation-triangle');
     });

     it('has an "error alert" label', function() {
       expect('.alert .sr-only').toContainText('error alert message,');
     });
   });
});
