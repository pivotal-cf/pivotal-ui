import '../spec_helper';
import {Radio, RadioGroup} from '../../../src/react/radio';

describe('RadioGroup', () => {
  const renderComponent = props => ReactDOM.render(<RadioGroup {...props}>
    <Radio value="one">first</Radio>
    <Radio value="two">second</Radio>
    <Radio value="three">third</Radio>
  </RadioGroup>, root);

  describe('basic RadioGroup', () => {
    it('renders', () => {
      renderComponent({name: 'radioGroup'});

      expect('.pui-radio-group input[type="radio"]').toHaveLength(3);
      expect('.pui-radio-group input[type="radio"]:eq(0)').toHaveValue('one');
      expect('.pui-radio-group input[type="radio"]:eq(1)').toHaveValue('two');
      expect('.pui-radio-group input[type="radio"]:eq(2)').toHaveValue('three');
    });

    describe('when the radio button is changed', () => {
      it('calls the change callback', () => {
        let clickedValue = null;
        const changeSpy = jasmine.createSpy('change').and.callFake(event => clickedValue = event.nativeEvent.target.value);
        renderComponent({onChange: changeSpy, name: 'radioGroup'});
        $('.pui-radio-group input[type="radio"]:eq(0)').simulate('change');

        expect(changeSpy.calls.count()).toEqual(1);
        expect(clickedValue).toEqual('one');
      });
    });
  });

  it('passes id, style, and className to radio group', () => {
    renderComponent({id: 'clear-channel', style: {color: 'rgb(255, 0, 0)'}, className: '1234', name: 'radioGroup'});
    expect('.pui-radio-group').toHaveAttr('id', 'clear-channel');
    expect('.pui-radio-group').toHaveClass('1234');
    expect('.pui-radio-group').toHaveCss({color: 'rgb(255, 0, 0)'});
  });
});
