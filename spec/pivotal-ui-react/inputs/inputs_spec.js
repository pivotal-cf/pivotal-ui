require('../spec_helper');

describe('Inputs', function() {
  let changeSpy, BasicInput;
  const id = 'firstNameInput';
  const label = 'First Name';
  beforeEach(function () {
    BasicInput = require('../../../src/pivotal-ui-react/inputs/inputs');
    changeSpy = jasmine.createSpy('change');
    ReactDOM.render(<BasicInput {...{className: 'input-class', label, id, onChange: changeSpy}}/>, root);
  });

  it('renders an input with the label', function() {
    expect('.form-group label').toContainText('First Name');
  });

  it('attaches the label to the input', function() {
    expect('.form-group label').toHaveAttr('for', id);
    expect('.form-group input').toHaveAttr('id', id);
  });

  it('passes properties to the input', function() {
    $('.form-group input').simulate('change');
    expect(changeSpy).toHaveBeenCalled();
  });

  it('merges classnames', function() {
    expect('.form-group input').toHaveClass( 'form-control');
    expect('.form-group').toHaveClass('input-class');
  });

  describe('Validation', function() {
    it('does not show error messages when displayError is false', function() {
      expect('.error-text').not.toExist();
    });
    it('shows error messages when displayError is true', function() {
      ReactDOM.render(<BasicInput displayError {...{className: 'input-class', label, id, onChange: changeSpy}}/>, root);
      expect('.error-text').toExist();
      expect('.error-text').toHaveText(`Please enter your ${label.toLowerCase()}.`);
    });
  });
});

describe('EmailInput', function() {
  let changeSpy, blurSpy;
  const id = 'emailInput';
  beforeEach(function () {
    const {EmailInput} = require('../../../app/components/inputs');
    changeSpy = jasmine.createSpy('change');
    blurSpy = jasmine.createSpy('blur');
    const setEmailValid = (emailValid) => {
      ReactDOM.render(<EmailInput {...{emailValid, className: 'input-class', setEmailValid, label: 'Email Address', name: 'email', id, change: changeSpy, blur: blurSpy}}/>, root);
    };
    ReactDOM.render(<EmailInput {...{className: 'input-class', setEmailValid, label: 'Email Address', name: 'email', id, change: changeSpy, blur: blurSpy}}/>, root);
  });
  describe('validating email', function() {
    beforeEach(function() {
      $('input[name="email"]').val('invalidemail').simulate('change').simulate('blur');
    });

    it('renders an error tooltip when provided an invalid email', function() {
      expect('.email-error').toExist();
    });

    it('clears the error when the email is fixed', function() {
      $('input[name="email"]').val('email@foo.com').simulate('change');
      expect('.email-error').not.toExist();
    });
  });
});