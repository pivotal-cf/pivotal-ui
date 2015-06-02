require('../spec_helper');

describe('SearchInput', function() {
  var SearchInput;
  beforeEach(function() {
    SearchInput = require('../../../src/pivotal-ui-react/search-input/search-input').SearchInput;
    React.render((<SearchInput/>), root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('renders a form group with the search classes', function() {
    expect('.form-group').toHaveClass('form-group-search');

    expect('.form-group input').toHaveClass('form-control');

    expect('.form-group i').toHaveClass('fa');
    expect('.form-group i').toHaveClass('fa-search');
  });

  describe('when a placeholder is provided', function() {
    beforeEach(function() {
      React.render((<SearchInput placeholder="Search here..."/>), root);
    });

    it('renders the input with a placeholder', function() {
      expect('.form-group input').toHaveAttr('placeholder', 'Search here...');
    });
  });

  describe('when a className is provided', function() {
    beforeEach(function() {
      React.render((<SearchInput className="foo myClass"/>), root);
    });

    it('adds the classes to the input', function() {
      expect('.form-group input').toHaveClass('foo');
      expect('.form-group input').toHaveClass('myClass');
    });
  });

  describe('when event handlers are provided', function() {
    var changeSpy;
    beforeEach(function() {
      changeSpy = jasmine.createSpy('change');
      React.render((<SearchInput onChange={changeSpy}/>), root);
    });

    it('adds the handlers to the search input', function() {
      $('input:eq(0)').simulate('change');
      expect(changeSpy).toHaveBeenCalled();
    });
  });
});
