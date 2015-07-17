require('../spec_helper');

describe('Radio', function() {
  var Radio;
  beforeEach(function() {
    Radio = require('../../../src/pivotal-ui-react/radio/radio').Radio;
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('renders a radio', function() {
    React.render(
      <Radio value="1" name="bananas" id="npr">
        One!!!
      </Radio>, root);
    expect('#root .radio label :radio[name=bananas]').toHaveValue('1');
    expect('#root .radio label').toContainText('One!!!');
    expect('#root #npr:radio').toExist();
  });

  describe('when the checked property is passed', function() {
    beforeEach(function() {
      React.render(
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
      React.render(
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
      React.render(
        <Radio value="1" name="bananas" className="radio-class" style={{opacity: '1'}} defaultChecked>
          One!!!
        </Radio>, root);
    });
    it('passes through className and style', () => {
      expect('#root .radio').toHaveClass('radio-class');
      expect('#root .radio').toHaveCss({opacity: '1'});
    });
  });

});
