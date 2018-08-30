import '../spec_helper';
import {Radio} from '../../../src/react/radio';

describe('Radio', () => {
  let subject;
  beforeEach(() => {
    const props = {value: 'I am a button', defaultChecked: true, id: 'some-id'};
    subject = shallow(<Radio {...props}>One!!!</Radio>);
  });

  afterEach(() => {
    // // ReactDOM.unmountComponentAtNode(root); // TODO: remove? // TODO: remove?
  });

  it('renders the radio button', () => {
    expect(subject.find('div.pui-radio > input[type="radio"]').exists()).toBeTruthy();
    expect(subject.find('div.pui-radio > input[type="radio"]').hasClass('pui-radio-input')).toBeTruthy();
    expect(subject.find('div.pui-radio > label').text()).toBe('One!!!');
    expect(subject.find('div.pui-radio > label').prop('for')).toBe('some-id');
    expect(subject.find('div.pui-radio > label').hasClass('pui-radio-label')).toBeTruthy();
    expect(subject.find('div.pui-radio > label > span.pui-radio-circle').exists()).toBeTruthy();
  });

  it('passes through className and style to the radio, and id to the input', () => {
    const props = {value: 'bananas', id: 'npr', className: 'radio-class', style: {opacity: '0.5'}};
    subject = shallow(<Radio {...props}>One!!!</Radio>);

    expect(subject.find(':radio').prop('id')).toBe('npr');
    expect(subject.find(':radio').hasClass('pui-radio-input')).toBeTruthy();
    expect(subject.find('div.pui-radio').hasClass('radio-class')).toBeTruthy();
    expect(subject.find('div.pui-radio').prop('style')).toEqual({opacity: '0.5'});
  });

  describe('when the checked property is passed', () => {
    beforeEach(() => {
      // // ReactDOM.unmountComponentAtNode(root); // TODO: remove? // TODO: remove?
    });

    it('renders a checked radio', () => {
      const props = {
        value: 'bananas',
        id: 'npr',
        checked: true,
        onChange: () => {}
      };
      subject = shallow(<Radio {...props}>One!!!</Radio>);
      expect(subject.find(':radio').prop('checked')).toBeTruthy();
    });
  });

  describe('when the defaultChecked property is passed', () => {
    beforeEach(() => {
      // // ReactDOM.unmountComponentAtNode(root); // TODO: remove? // TODO: remove?
    });

    it('renders a checked radio', () => {
      const props = {value: 'bananas', defaultChecked: true};
      subject = shallow(<Radio {...props} />);
      expect(subject.find(':radio').prop('checked')).toBeTruthy();
    });
  });

  describe('changing the value of the radio button', () => {
    beforeEach(() => {
      // // ReactDOM.unmountComponentAtNode(root); // TODO: remove? // TODO: remove?
    });

    it('triggers the onChange callback', () => {
      const changeSpy = jest.fn().mockName('change');
      const props = {value: 'bananas', onChange: changeSpy};
      subject = shallow(<Radio {...props} />);
      subject.find(':radio').simulate('change');

      expect(changeSpy).toHaveBeenCalled();
    });
  });

  describe('when disabled property is passed', () => {
    beforeEach(() => {
      // // ReactDOM.unmountComponentAtNode(root); // TODO: remove? // TODO: remove?
    });

    it('disables the radio button', () => {
      const props = {value: 'bananas', disabled: true};
      subject = shallow(<Radio {...props}>Testing</Radio>);

      expect(subject.find(':radio').prop('disabled')).toBeTruthy();
      expect(subject.find(':radio').prop('aria-disabled')).toBe('true');
    });
  });

  it('passes through labelClassName to the label', () => {
    const props = {value: 'bananas', labelClassName: 'label-radio-class'};
    subject = shallow(<Radio {...props}>One!!!</Radio>);

    expect(subject.find('div.pui-radio > .label-radio-class').exists()).toBeTruthy();
  });
});