import '../spec_helper';
import {Divider} from '../../../src/react/dividers';

import {findByTag} from '../spec_helper';

describe('Divider', () => {
  let result, renderComponent, subject;
  beforeEach(() => {
    renderComponent = props => subject = shallow(<Divider {...props}/>);
  });

  describe('rendering', () => {
    let props;

    beforeEach(() => {
      props = {className: 'test-class', id: 'test-id', style: {opacity: '0.5'}};
      result = renderComponent(props);
    });

    it('creates a divider', () => {
      expect(result.find('hr').hasClass('divider-alternate-1')).toBeTruthy();
    });

    it('adds provided attributes to the correct component', () => {
      expect(subject.find('hr').hasClass(props.className)).toBeTruthy();
      expect(subject.find('hr').prop('id')).toBe(props.id);
      expect(subject.find('hr').prop('style')).toEqual(props.style);
    });
  });

  describe('when size is set to large', () => {
    beforeEach(() => {
      result = renderComponent({size: 'large'});
    });

    it('creates a divider with -2 appended to the classname', () => {
      expect(result.find('hr').hasClass('divider-alternate-2')).toBeTruthy();
    });
  });

  describe('when inverse is true', () => {
    beforeEach(() => {
      result = renderComponent({inverse: true});
    });

    it('creates a divider without the -alternate in the class', () => {
      expect(result.find('hr').hasClass('divider-1')).toBeTruthy();
    });
  });

  describe('when size is set to large and inverse is set to true', () => {
    beforeEach(() => {
      result = renderComponent({inverse: true, size: 'large'});
    });

    it('creates a divider without the -alternate in the class and -2 appended to the classname', () => {
      expect(result.find('hr').hasClass('divider-2')).toBeTruthy();
    });
  });

  describe('setting a custom data attribute', () => {
    beforeEach(() => {
      result = renderComponent({'data-behavior': 'myAttr'});
    });

    it('passes the data attribute through to the divider', () => {
      expect(result.find('hr').prop('data-behavior')).toBe('myAttr');
    });
  });
});
