import '../spec_helper';

import {Radio, RadioGroup} from 'pui-react-radio';
import {findByClass, findByTag, findAllByTag} from '../spec_helper';

describe('Radio', () => {
  let result;
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Radio {...props}>One!!!</Radio>);

  it('renders a radio', () => {
    result = renderComponent({value: '1'});
    const radio = findByClass(result, 'radio');
    const input = radio.getElementsByTagName('input')[0];

    expect(input).toHaveValue('1');
    expect(radio).toHaveText('One!!!');
  });

  it('passes through className and style to the radio, and id to the input', () => {
    result = renderComponent({value: 'bananas', id: 'npr', className: 'radio-class', style: {opacity: '0.5'}});
    const radio = findByClass(result, 'radio');
    const input = radio.getElementsByTagName('input')[0];

    expect(input).toHaveAttr('id', 'npr');
    expect(radio).toHaveClass('radio-class');
    expect(radio).toHaveCss({opacity: '0.5'});
  });

  describe('when the checked property is passed', () => {
    it('renders a checked radio', () => {
      result = renderComponent({
        value: 'bananas', checked: true, onChange: () => {
        }
      });

      const radio = findByClass(result, 'radio');
      const input = radio.getElementsByTagName('input')[0];

      expect(input.checked).toBe(true);
    });
  });

  describe('when the defaultChecked property is passed', () => {
    it('renders a checked radio', () => {
      result = renderComponent({value: 'bananas', defaultChecked: true});

      const input = findByTag(result, 'input');
      expect(input.checked).toBe(true);
    });
  });

  describe('changing the value of the radio button', () => {
    it('triggers the onChange callback', () => {
      const changeSpy = jasmine.createSpy('change');
      result = renderComponent({value: 'bananas', onChange: changeSpy});
      const input = findByTag(result, 'input');

      ReactTestUtils.Simulate.change(input, {'target': {'checked': true}});
      jasmine.clock().tick(1);

      expect(changeSpy).toHaveBeenCalled();
    });
  });

  describe('when disabled property is passed', () => {
    it('disables the radio button', () => {
      result = renderComponent({value: 'bananas', disabled: true});
      const input = findByTag(result, 'input');

      expect(input).toHaveAttr('disabled');
      expect(input).toHaveAttr('aria-disabled', 'true');
    });
  });
});


describe('RadioGroup', () => {
  let result;
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<RadioGroup {...props}>
    <Radio value="one">first</Radio>
    <Radio value="two">second</Radio>
    <Radio value="three">third</Radio>
  </RadioGroup>);

  describe('basic RadioGroup', () => {
    it('renders', () => {
      result = renderComponent({name: 'radioGroup'});
      const radioGroup = findByClass(result, 'radio-group');
      const radioButtons = radioGroup.getElementsByTagName('input');

      expect(radioButtons).toHaveLength(3);
      expect(radioButtons[0]).toHaveValue('one');
      expect(radioButtons[1]).toHaveValue('two');
      expect(radioButtons[2]).toHaveValue('three');
    });

    describe('when the radio button is changed', () => {
      it('calls the change callback', () => {
        let clickedValue = null;
        const changeSpy = jasmine.createSpy('change').and.callFake(event => clickedValue = event.nativeEvent.target.value);
        result = renderComponent({onChange: changeSpy, name: 'radioGroup'});
        const input = findAllByTag(result, 'input')[0];

        ReactTestUtils.Simulate.change(input, {'target': {'checked': true}});

        expect(changeSpy.calls.count()).toEqual(1);
        expect(clickedValue).toEqual('one');
      });
    });
  });

  it('passes id, style, and className to radio group', () => {
    result = renderComponent({id: 'clear-channel', style: {color: 'red'}, className: '1234', name: 'radioGroup'});
    const radioGroup = findByClass(result, 'radio-group');

    expect(radioGroup).toHaveAttr('id', 'clear-channel');
    expect(radioGroup).toHaveClass('1234');
    expect(radioGroup).toHaveCss({color: 'red'});
  });
});
