import '../spec_helper';
import {Grid} from '../../../src/react/flex-grids';

describe('Grid', () => {
  let gridProps, subject;

  describe('default props', () => {
    beforeEach(() => {
      gridProps = {className: 'test-class', id: 'test-id', style: {opacity: 0.75}};
      subject = shallow(<Grid {...gridProps}/>);
    });

    it('does not have grid-nogutter class by default', () => {
      expect(subject.find('.grid').hasClass('grid-nogutter')).toBeFalsy();
    });

    it('adds these attributes to the correct component', () => {
      expect(subject.find('.grid').hasClass(gridProps.className)).toBeTruthy();
      expect(subject.find('.grid').prop('id')).toBe(gridProps.id);
      expect(subject.find('.grid').prop('style')).toEqual(gridProps.style);
    });
  });

  describe('gutter prop', () => {
    beforeEach(() => {
      gridProps = {gutter: false};
      subject = shallow(<Grid {...gridProps}/>);
    });

    it('adds grid-nogutter class', () => {
      expect(subject.find('.grid').hasClass('grid-nogutter')).toBeTruthy();
    });
  });

  describe('justifyContent prop', () => {
    beforeEach(() => {
      gridProps = {justifyContent: 'space-between'};
      subject = shallow(<Grid {...gridProps}/>);
    });

    it('adds justify-content-space-between class', () => {
      expect(subject.find('.grid').hasClass('justify-content-space-between')).toBeTruthy();
    });
  });
});
