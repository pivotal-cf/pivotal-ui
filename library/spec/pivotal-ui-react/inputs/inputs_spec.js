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
});
