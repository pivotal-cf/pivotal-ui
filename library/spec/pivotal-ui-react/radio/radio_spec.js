require('../spec_helper');

describe('Radio', function() {
  var Radio;
  beforeEach(function() {
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
    beforeEach(function() {
      ReactDOM.render(
        <Radio value="1" name="bananas" checked onChange={jasmine.createSpy('change')}>
          One!!!
        </Radio>, root);
    });

    it('renders a checked radio', function() {
      expect('#root .radio label :radio[name=bananas]').toBeChecked();
    });
  });

  describe('when the defaultChecked property is passed', function() {
    var changeSpy;

    beforeEach(function() {
      changeSpy = jasmine.createSpy('change');
      ReactDOM.render(
        <Radio value="1" name="bananas" onChange={changeSpy} defaultChecked>
          One!!!
        </Radio>, root);
    });

    it('renders a checked radio', function() {
      expect('#root .radio label :radio[name=bananas]').toBeChecked();
    });

    describe('changing the value of the radio button', function() {
      it('triggers the onChange callback', function() {
        $('#root .radio label :radio').simulate('click');
        expect(changeSpy).toHaveBeenCalled();
      });
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
