require('../spec_helper');

describe('RadioGroup', function() {
  var changeSpy;
  beforeEach(function() {
    var RadioGroup = require('../../../src/pivotal-ui-react/radio-group/radio-group').RadioGroup;
    var Radio = require('../../../src/pivotal-ui-react/radio/radio').Radio;

    changeSpy = jasmine.createSpy('change');
    React.render(
      <RadioGroup name="bananas" onChange={changeSpy} id="clear-channel">
        <Radio value="1">One!!!</Radio>
        <Radio value="2">The two value</Radio>
        <Radio value="3">Three</Radio>
      </RadioGroup>,
      root
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('renders the radio group', function() {
    expect('.radio-group#clear-channel').toExist();
  });

  it('renders 3 radiobuttons', function() {
    expect('.radio-group .radio label :radio[name=bananas]').toHaveLength(3);
    expect('.radio-group .radio label :radio[name=bananas]:eq(0)').toHaveValue('1');
    expect('.radio-group .radio label :radio[name=bananas]:eq(1)').toHaveValue('2');
    expect('.radio-group .radio label :radio[name=bananas]:eq(2)').toHaveValue('3');
  });

  describe('when the radio button is changed', function() {
    beforeEach(function() {
      $('.radio-group :radio').simulate('change').simulate('click');
    });

    it('calls the change callback', function() {
      expect(changeSpy).toHaveBeenCalledWith('1');
    });
  });
});
