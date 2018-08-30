import '../spec_helper';
import {Radio, RadioGroup} from '../../../src/react/radio';

describe('RadioGroup', () => {
  let subject;

  const secondRadioSpy = jest.fn().mockName('secondRadio');

  beforeEach(() => {
    subject = shallow(<RadioGroup name="group-1">
      <Radio value="one">first</Radio>
      <Radio value="two" onChange={secondRadioSpy}>second</Radio>
      <Radio value="three">third</Radio>
    </RadioGroup>);
  });

  it('renders', () => {
    expect('.pui-radio-group input[type="radio"]').toHaveLength(3);
    expect(subject.find('.pui-radio-group input[type="radio"]').at(0).prop('value')).toBe('one');
    expect(subject.find('.pui-radio-group input[type="radio"]').at(1).prop('value')).toBe('two');
    expect(subject.find('.pui-radio-group input[type="radio"]').at(2).prop('value')).toBe('three');
  });

  describe('when the radio button is changed', () => {
    let clickedValue, changeSpy;

    beforeEach(() => {
      clickedValue = null;
      changeSpy = jest.fn().mockName('change').mockImplementation(event => clickedValue = event.nativeEvent.target.value);
      subject.setProps({onChange: changeSpy, name: 'radioGroup'});
      subject.find('.pui-radio-group input[type="radio"]').at(0).simulate('change');
    });

    it('calls the change callback', () => {
      expect(changeSpy.calls.length).toEqual(1);
      expect(clickedValue).toEqual('one');
    });
  });

  describe('when given a value', () => {
    beforeEach(() => {
      subject.setProps({value: 'three'});
    });

    it('checks the corresponding radio', () => {
      expect(subject.find('.pui-radio-group input[type="radio"]').at(0).prop('checked')).toBeFalsy();
      expect(subject.find('.pui-radio-group input[type="radio"]').at(1).prop('checked')).toBeFalsy();
      expect(subject.find('.pui-radio-group input[type="radio"]').at(2).prop('checked')).toBeTruthy();
    });
  });

  describe('other props and no onChange', () => {
    beforeEach(() => {
      subject.setProps({id: 'clear-channel', style: {color: 'rgb(255, 0, 0)'}, className: '1234'});
    });

    it('passes id, style, and className to radio group', () => {
      expect(subject.find('.pui-radio-group').prop('id')).toBe('clear-channel');
      expect(subject.find('.pui-radio-group').hasClass('1234')).toBeTruthy();
      expect(subject.find('.pui-radio-group').prop('style')).toEqual({color: 'rgb(255, 0, 0)'});
    });

    describe('when changing the second radio', () => {
      beforeEach(() => {
        subject.find('.pui-radio-group input[type="radio"]').at(1).simulate('change');
      });

      it('calls the second radio onChange', () => {
        expect(secondRadioSpy).toHaveBeenCalled();
      });
    });
  });
});
