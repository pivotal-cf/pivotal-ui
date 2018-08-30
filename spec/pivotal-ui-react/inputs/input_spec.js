import '../spec_helper';
import {Input} from '../../../src/react/inputs';

describe('Input', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<Input />);
  });

  it('renders an HTML input', () => {
    expect(subject.find('input').exists()).toBeTruthy();
  });

  describe('when given props', () => {
    beforeEach(() => {
      subject.setProps({
        type: 'password',
        className: 'some-class'
      });
    });

    it('passes the props to the HTML input', () => {
      expect(subject.find('input').prop('type')).toBe('password');
      expect(subject.find('input').hasClass('some-class')).toBeTruthy();
    });
  });

  describe('size = sm', () => {
    beforeEach(() => {
      subject.setProps({size: 'sm'});
    });

    it('has the input-sm class', () => {
      expect(subject.find('input').hasClass('input-sm')).toBeTruthy();
    });
  });

  describe('size = small', () => {
    beforeEach(() => {
      subject.setProps({size: 'small'});
    });

    it('has the input-sm class', () => {
      expect(subject.find('input').hasClass('input-sm')).toBeTruthy();
    });
  });

  describe('size = lg', () => {
    beforeEach(() => {
      subject.setProps({size: 'lg'});
    });

    it('has the input-lg class', () => {
      expect(subject.find('input').hasClass('input-lg')).toBeTruthy();
    });
  });

  describe('size = large', () => {
    beforeEach(() => {
      subject.setProps({size: 'large'});
    });

    it('has the input-lg class', () => {
      expect(subject.find('input').hasClass('input-lg')).toBeTruthy();
    });
  });

  describe('icon', () => {
    beforeEach(() => {
      subject.setProps({icon: 'search'});
    });

    it('renders an input-icon-container', () => {
      expect(subject.find('.input-icon-container').exists()).toBeTruthy();
    });

    it('renders an icon', () => {
      expect(subject.find('.input-icon-container > .icon svg').hasClass('icon-search')).toBeTruthy();
    });

    it('renders an input', () => {
      expect(subject.find('.input-icon-container > input').exists()).toBeTruthy();
    });
  });
});