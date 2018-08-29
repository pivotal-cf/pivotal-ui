import '../spec_helper';
import {Radio, RadioGroup} from '../../../src/react/radio';

describe('RadioGroup', () => {
  let subject;

  const secondRadioSpy = jest.fn();

  beforeEach(() => {
    subject = shallow(<RadioGroup name="group-1">
      <Radio value="one">first</Radio>
      <Radio value="two" onChange={secondRadioSpy}>second</Radio>
      <Radio value="three">third</Radio>
    </RadioGroup>);
  });

  it('renders', () => {
    expect('.pui-radio-group input[type="radio"]').toHaveLength(3);
    expect('.pui-radio-group input[type="radio"]:eq(0)').toHaveValue('one');
    expect('.pui-radio-group input[type="radio"]:eq(1)').toHaveValue('two');
    expect('.pui-radio-group input[type="radio"]:eq(2)').toHaveValue('three');
  });

  describe('when the radio button is changed', () => {
    let clickedValue, changeSpy;

    beforeEach(() => {
      clickedValue = null;
      changeSpy = jest.fn().and.callFake(event => clickedValue = event.nativeEvent.target.value);
      subject.setProps({onChange: changeSpy, name: 'radioGroup'});
      $('.pui-radio-group input[type="radio"]:eq(0)').simulate('change');
    });

    it('calls the change callback', () => {
      expect(changeSpy.calls.count()).toEqual(1);
      expect(clickedValue).toEqual('one');
    });
  });

  describe('when given a value', () => {
    beforeEach(() => {
      subject.setProps({value: 'three'});
    });

    it('checks the corresponding radio', () => {
      expect('.pui-radio-group input[type="radio"]:eq(0)').not.toBeChecked();
      expect('.pui-radio-group input[type="radio"]:eq(1)').not.toBeChecked();
      expect('.pui-radio-group input[type="radio"]:eq(2)').toBeChecked();
    });
  });

  describe('other props and no onChange', () => {
    beforeEach(() => {
      subject.setProps({id: 'clear-channel', style: {color: 'rgb(255, 0, 0)'}, className: '1234'});
    });

    it('passes id, style, and className to radio group', () => {
      expect(subject.find('.pui-radio-group').prop('id')).toBe('clear-channel');
      expect(subject.find('.pui-radio-group').hasClass('1234')).toBeTruthy();
      expect('.pui-radio-group').toHaveCss({color: 'rgb(255, 0, 0)'});
    });

    describe('when changing the second radio', () => {
      beforeEach(() => {
        $('.pui-radio-group input[type="radio"]:eq(1)').simulate('change');
      });

      it('calls the second radio onChange', () => {
        expect(secondRadioSpy).toHaveBeenCalled();
      });
    });
  });
});
