require('../spec_helper');
const TestUtils = require('react-addons-test-utils');

describe('Radio', function() {
  let Radio;
  beforeEach(() => {
    Radio = require('../../../src/pivotal-ui-react/radio/radio').Radio;
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('renders a radio', function() {
    ReactDOM.render(
      <Radio value="1" name="bananas" id="npr">
        One!!!
      </Radio>, root);
    expect('#root .radio label :radio[name=bananas]').toHaveValue('1');
    expect('#root .radio label').toContainText('One!!!');
    expect('#root #npr:radio').toExist();
  });

  describe('when the checked property is passed', function() {
    let changeSpy;

    beforeEach(function() {
      changeSpy = jasmine.createSpy('change');
      ReactDOM.render(
        <Radio value="1" name="bananas" checked onChange={changeSpy}>
          One!!!
        </Radio>, root);
    });

    it('renders a checked radio', function() {
      expect('#root .radio label :radio[name=bananas]').toBeChecked();
    });

    describe('changing the value of the radio button', function() {
      it('triggers the onChange callback', function() {
        $('.radio label :radio').simulateNative('click');
        expect(changeSpy).toHaveBeenCalled();
      });
    });
  });

  describe('when the defaultChecked property is passed', function() {

    beforeEach(function() {
      ReactDOM.render(
        <Radio value="1" name="bananas" defaultChecked>
          One!!!
        </Radio>, root);
    });

    it('renders a checked radio', function() {
      expect('#root .radio label :radio[name=bananas]').toBeChecked();
    });


  });

  describe('when className and style are passed', () => {
    beforeEach(() =>{
      ReactDOM.render(
        <Radio value="1" name="bananas" className="radio-class" style={{opacity: '0.5'}} defaultChecked>
          One!!!
        </Radio>, root);
    });
    it('passes through className and style', () => {
      expect('#root .radio').toHaveClass('radio-class');
      expect('#root .radio').toHaveCss({opacity: '0.5'});
    });
  });

  describe('when disabled property is passed', () => {
    beforeEach(() => {
      ReactDOM.render(
        <Radio
          value="a value we do not care about"
          disabled>
          A label we do not care about
        </Radio>, root);
    });

    it('disables the radio button', () => {
      expect('#root .radio label :radio').toHaveAttr('disabled');
      expect('#root .radio label :radio').toHaveAttr('aria-disabled');
    });

    it('gets the disabled class on the label', () => {
      expect('#root .radio label').toHaveClass('disabled');
    });
  });
});

describe('RadioGroup', function() {
  let Radio, RadioGroup;
  beforeEach(() => {
    Radio = require('../../../src/pivotal-ui-react/radio/radio').Radio;
    RadioGroup = require('../../../src/pivotal-ui-react/radio/radio').RadioGroup;
  });

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
        $('.radio-group :radio:eq(0)').simulateNative('click');
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
