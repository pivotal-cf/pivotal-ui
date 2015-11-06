require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';

describe('SearchInput', function() {
  var SearchInput;
  beforeEach(function() {
    SearchInput = require('../../../src/pivotal-ui-react/search-input/search-input').SearchInput;
    ReactDOM.render((<SearchInput className="foo myClass" id="bar" style={{opacity: '0.5'}}/>), root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('renders a form group with the search classes', function() {
    expect('.form-group').toHaveClass('form-group-search');

    expect('.form-group input').toHaveClass('form-control');

    expect('.form-group i').toHaveClass('fa');
    expect('.form-group i').toHaveClass('fa-search');
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
    var changeSpy;
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
