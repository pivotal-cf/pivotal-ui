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

  it('renders a sr-only alert description', () => {
    ReactDOM.render(<SuccessAlert withIcon>alert body</SuccessAlert>, root);
    expect('.alert span.sr-only').toContainText('success alert message,');
  });

  describe('when dismissable is set to true', function() {
    let subject;
    beforeEach(function() {
      subject = ReactDOM.render(<SuccessAlert dismissable={true}>alert body</SuccessAlert>, root);
    });

    it('adds the alert-dismissable class', () => {
      expect('.alert').toHaveClass('alert-dismissable');
    });

    it('has a close button', function() {
      expect('button.close').toExist();
    });

    it('has an sr-only close button', () => {
      expect('button.close:not(".sr-only")').toHaveAttr('aria-hidden', 'true');
      expect('button.sr-only').toHaveText('Close alert');
    });

    it('adds the closeLabel to the close button', () => {
      subject::setProps({closeLabel: 'click to close the alert'});
      expect('button.sr-only').toHaveText('click to close the alert');
    });

    it('disappears when close button is clicked', function() {
      $('button.close').simulate('click');
      expect('#root .alert').not.toExist();
    });

    describe('when onDismiss is given', () => {
      let onDismissSpy;

      beforeEach(() => {
        onDismissSpy = jasmine.createSpy('dismissable callback');
        subject::setProps({onDismiss: onDismissSpy});
      });

      it('calls onDismiss when the close button is clicked', function() {
        $('button.close').simulate('click');
        expect(onDismissSpy).toHaveBeenCalled();
        expect('#root .alert').not.toExist();
      });
    });
  });

  describe('when show is true', () => {
    let onDismissSpy, subject;
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy('dismissable callback');
      subject = ReactDOM.render(<SuccessAlert dismissable={true} onDismiss={onDismissSpy} show={true}>alert body</SuccessAlert>, root);
    });

    it('renders the alert even after the close button is clicked', () => {
      $('button.close').simulate('click');
      expect(onDismissSpy).toHaveBeenCalled();
      expect('#root .alert').toExist();
    });

    it('hides the alert when show is set to false', () => {
      subject::setProps({show: false});
      expect('#root .alert').not.toExist();
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

    it('renders a success alert', () => {
      expect('.alert').toHaveClass('alert-success');
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

    it('renders an info alert', () => {
      expect('.alert').toHaveClass('alert-info');
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

     it('renders an warning alert', () => {
       expect('.alert').toHaveClass('alert-warning');
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

     it('renders a danger alert', () => {
       expect('.alert').toHaveClass('alert-danger');
     });

     it('renders an icon in the alert', function() {
       expect('i').toHaveClass('fa-exclamation-triangle');
     });

     it('has an "error alert" label', function() {
       expect('.alert .sr-only').toContainText('error alert message,');
     });
   });
});
