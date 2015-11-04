require('../spec_helper');

describe('SelectFancy', function() {
  var SelectFancy;
  beforeEach(function() {
    SelectFancy = require('../../../src/pivotal-ui-react/select-fancy/select-fancy').SelectFancy;
    ReactDOM.render((<SelectFancy className="foo myClass" id="myId"/>), root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('renders a select fancy component with class', function() {
    expect('.select-fancy').toHaveClass('foo');
    expect('.select-fancy').toHaveClass('myClass');

    expect('select').toHaveClass('form-control');
    expect('select').toHaveAttr('id', 'myId');
  });

  describe('when a name is provided', function() {
    beforeEach(function() {
      ReactDOM.render((<SelectFancy name="my-select"/>), root);
    });

    it('renders the select with a name', function() {
      expect('select').toHaveAttr('name', 'my-select');
    });
  });

  describe('when event handlers are provided', function() {
    var changeSpy;
    beforeEach(function() {
      changeSpy = jasmine.createSpy('change');
      ReactDOM.render((<SelectFancy onChange={changeSpy}/>), root);
    });

    it('adds the handlers to the search input', function() {
      $('select').simulate('change');
      expect(changeSpy).toHaveBeenCalled();
    });
  });

  describe('when the disabled prop is truthy', function() {
    beforeEach(function() {
      ReactDOM.render((<SelectFancy disabled/>), root);
    });

    it('adds the disabled class to the select-fancy wrapper', function() {
      expect('.select-fancy').toHaveClass('disabled');
    });

    it('disables the select', function() {
      expect('select:disabled').toExist();
    });
  });
});
