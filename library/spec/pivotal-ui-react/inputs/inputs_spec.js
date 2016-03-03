require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';

describe('inputs', function() {
  describe('SearchInput', function() {
    let SearchInput;
    beforeEach(function() {
      SearchInput = require('../../../src/pivotal-ui-react/inputs/inputs').SearchInput;
      ReactDOM.render((<SearchInput className="foo myClass" id="bar" style={{opacity: '0.5'}}/>), root);
    });

    it('renders a form group with the search classes', function() {
      expect('.form-group').toHaveClass('form-group-search');

      expect('.form-group input').toHaveClass('form-control');

      expect('.form-group i').toHaveClass('search-icon');
    });

    describe('when a placeholder is provided', function() {
      beforeEach(function() {
        ReactDOM.render((<SearchInput placeholder="Search here..."/>), root);
      });

      it('renders the input with a placeholder', function() {
        expect('.form-group input').toHaveAttr('placeholder', 'Search here...');
      });

      it('adds an aria label with the placeholder value', function() {
        expect('.form-group input').toHaveAttr('aria-label', 'Search here...');
      });

      describe('when an aria-label is provided as well', function() {
        beforeEach(function() {
          ReactDOM.render((<SearchInput placeholder="Search here..." aria-label="Search Box" />), root);
        });

        it('uses the label as the aria-label instead of the placeholder', function() {
          expect('.form-group input').toHaveAttr('aria-label', 'Search Box');
        });
      });
    });

    itPropagatesAttributes('.form-group input', {className: 'foo', id: 'bar', style: {opacity: '0.5'}});

    describe('when event handlers are provided', function() {
      let changeSpy;
      beforeEach(function() {
        changeSpy = jasmine.createSpy('change');
        ReactDOM.render((<SearchInput onChange={changeSpy}/>), root);
      });

      it('adds the handlers to the search input', function() {
        $('input:eq(0)').simulate('change');
        expect(changeSpy).toHaveBeenCalled();
      });
    });
  });

  describe('BasicInput', function() {
    let changeSpy, BasicInput;
    const id = 'firstNameInput';
    const label = 'First Name';
    beforeEach(function () {
      BasicInput = require('../../../src/pivotal-ui-react/inputs/inputs').BasicInput;
      changeSpy = jasmine.createSpy('change');
      ReactDOM.render(<BasicInput success {...{className: 'input-class', label, id, onChange: changeSpy}}/>, root);
    });

    it('renders an input with the label', function() {
      expect('.control-label').toContainText('First Name');
    });

    it('attaches the label to the input', function() {
      expect('.control-label').toHaveAttr('for', id);
      expect('.form-group input').toHaveAttr('id', id);
    });

    it('passes properties to the input', function() {
      $('.form-group input').simulate('change');
      expect(changeSpy).toHaveBeenCalled();
    });

    it('displays a checkmark when success prop is true', () => {
      expect('.has-success').toExist();
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

  describe('Checkbox', function() {
    let subject;
    const id = 'id';
    const labelPath = '.checkbox label';
    const inputPath = '.checkbox input[type="checkbox"]';

    beforeEach(() => {
      const Checkbox = require('../../../src/pivotal-ui-react/inputs/inputs').Checkbox;
      subject = ReactDOM.render(<Checkbox label="labelText" id={id}/>, root);
    });

    it('renders an input type checkbox', () => {
      expect(inputPath).toExist();
    });

    it('renders a label', () => {
      expect(labelPath).toHaveText('labelText');
    });

    it('add more classes to the component', () => {
      subject::setProps({className: 'checkbox-extra'});
      expect('.form-group').toHaveClass('checkbox-extra');
    });

    it('passes properties through to the input', () => {
      subject::setProps({checked: true});
      expect(inputPath).toBeChecked();
    });

    it('associates the label with the checkbox', () => {
      expect(labelPath).toHaveAttr('for', id);
      expect(inputPath).toHaveAttr('id', id);
    });

    it('applies css class to input checkbox and the label', () => {
      subject::setProps({inputClassName: 'input-class', labelClassName: 'label-class'});
      expect(labelPath).toHaveClass('label-class');
      expect(inputPath).toHaveClass('input-class');
    });

    it('add css class disabled when input checkbox is disabled', () => {
      subject::setProps({disabled: true});
      expect(labelPath).toHaveClass('disabled');
      expect(inputPath).toBeDisabled();
    });

    describe('errors', () => {
      it('display error message when display error is true', () => {
        subject::setProps({displayError: true, errorMessage: 'Error!'});
        expect('.form-group').toHaveClass('has-error');
        expect('.help-block').toContainText('Error!');
      });

      it('hide error element when display error is false', () => {
        subject::setProps({displayError: false, errorMessage: 'Error!'});
        expect('.form-group').not.toHaveClass('has-error');
        expect('.help-block').not.toExist();
      });
    });
  });
});
