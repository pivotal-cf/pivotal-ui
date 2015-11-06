require('../spec_helper');
var RadioGroup = require('../../../src/pivotal-ui-react/radio-group/radio-group').RadioGroup;
var Radio = require('../../../src/pivotal-ui-react/radio/radio').Radio;

describe('RadioGroup', function() {
  describe('basic RadioGroup', function() {
    var changeSpy, callValue;
    beforeEach(function() {

      changeSpy = jasmine.createSpy('change').and.callFake(function(e) {
        callValue = e.target.value;
      });
      ReactDOM.render(
        <RadioGroup name="bananas" onChange={changeSpy}>
          <Radio value="1">One!!!</Radio>
          <Radio value="2">The two value</Radio>
          <Radio value="3">Three</Radio>
        </RadioGroup>,
        root
      );
    });

    afterEach(function() {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('renders the radio group', function() {
      expect('.radio-group').toExist();
    });

    it('renders 3 radiobuttons', function() {
      expect('.radio-group .radio label :radio[name=bananas]').toHaveLength(3);
      expect('.radio-group .radio label :radio[name=bananas]:eq(0)').toHaveValue('1');
      expect('.radio-group .radio label :radio[name=bananas]:eq(1)').toHaveValue('2');
      expect('.radio-group .radio label :radio[name=bananas]:eq(2)').toHaveValue('3');
    });

    describe('when the radio button is changed', function() {
      beforeEach(function() {
        $('.radio-group :radio:eq(0)').simulate('click');
      });

      it('calls the change callback', function() {
        expect(callValue).toEqual('1');
        expect(changeSpy.calls.count()).toEqual(1);
      });
    });
  });

  describe('RadioGroup with custom attributes', function() {
    beforeEach(function() {
      ReactDOM.render(
        <RadioGroup name="bananas" id="clear-channel" style={{color: 'red'}} className='1234'>
          <Radio value="1">One!!!</Radio>
          <Radio value="2">The two value</Radio>
          <Radio value="3">Three</Radio>
        </RadioGroup>,
        root
      );
    });

    it('renders the radio group with the overrides', function() {
      expect('.radio-group').toHaveAttr('id', 'clear-channel');
      expect('.radio-group').toHaveClass('1234');
      expect('.radio-group').toHaveCss({color: 'rgb(255, 0, 0)'});
    });
  });
});
