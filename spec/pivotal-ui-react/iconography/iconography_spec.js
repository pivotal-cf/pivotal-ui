import '../spec_helper';
import {Icon} from '../../../src/react/iconography';

describe('iconography', () => {
  let subject;
  afterEach(() => {
    // // // ReactDOM.unmountComponentAtNode(root); // TODO: remove? // TODO: remove? // TODO: remove?
  });

  it('works', () => {
    subject = shallow(<Icon src="add"/>);
    expect(subject.find('.icon svg').exists()).toBeTruthy();
  });

  it('propagates className and id to the span', () => {
    subject = shallow(<Icon src="add" className="foo" id="bar"/>);
    expect(subject.find('.icon').hasClass('foo')).toBeTruthy();
    expect(subject.find('.icon').prop('id')).toBe('bar');
  });

  describe('verticalAlign', () => {
    it('if verticalAlign is not specified it applies the .icon-middle', () => {
      subject = shallow(<Icon src="add"/>);
      expect(subject.find('.icon').hasClass('icon-middle')).toBeTruthy();
    });

    it('if verticalAlign=baseline it applies the .icon-middle class', () => {
      subject = shallow(<Icon src="add" verticalAlign="middle"/>);
      expect(subject.find('.icon').hasClass('icon-middle')).toBeTruthy();
    });

    it('if verticalAlign=baseline it applies the .icon-baseline class', () => {
      subject = shallow(<Icon src="add" verticalAlign="baseline"/>);
      expect(subject.find('.icon').hasClass('icon-baseline')).toBeTruthy();
    });
  });

  describe('unknown icon', () => {
    beforeEach(() => {
      spyOn(console, 'warn');
      subject = shallow(<Icon src="non-existing-icon"/>);
    });

    it('renders a help', () => {
      expect(subject.find('.icon .icon-help').exists()).toBeTruthy();
    });

    it('logs an error message', () => {
      expect(console.warn).toHaveBeenCalledWith('Icon "non-existing-icon" is not recognized.');
    });
  });
});
