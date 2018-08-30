import '../spec_helper';
import {ProgressBar} from '../../../src/react/progress-bar';

describe('ProgressBar', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<ProgressBar/>);
  });

  it('renders a progress background div', () => {
    expect(subject.find('.pui-progress').exists()).toBeTruthy();
  });

  it('renders a progress foreground div', () => {
    expect(subject.find('.pui-progress .pui-progress-bar').prop('role')).toBe('progressbar');
    expect(subject.find('.pui-progress .pui-progress-bar').prop('aria-valuemax')).toBe('100');
    expect(subject.find('.pui-progress .pui-progress-bar').prop('aria-valuemin')).toBe('0');
    expect(subject.find('.pui-progress .pui-progress-bar').prop('aria-valuenow')).toBe('0');
    expect(subject.find('.pui-progress .pui-progress-bar').prop('style')).toEqual({width: '0%'});
  });

  describe('when given a className', () => {
    beforeEach(() => {
      subject.setProps({className: 'custom-class'});
    });

    it('applies the class to the outer div', () => {
      expect(subject.find('.pui-progress').hasClass('custom-class')).toBeTruthy();
    });
  });

  describe('when given a barClassName', () => {
    beforeEach(() => {
      subject.setProps({barClassName: 'custom-bar-class'});
    });

    it('applies the class to the progress bar', () => {
      expect(subject.find('.pui-progress .pui-progress-bar').hasClass('custom-bar-class')).toBeTruthy();
    });
  });

  describe('when given a value', () => {
    beforeEach(() => {
      subject.setProps({value: 78});
    });

    it('sets the attributes of the progress bar accordingly', () => {
      expect(subject.find('.pui-progress .pui-progress-bar').prop('aria-valuenow')).toBe('78');
      expect(subject.find('.pui-progress .pui-progress-bar').prop('style')).toEqual({width: '78%'});
    });
  });
});