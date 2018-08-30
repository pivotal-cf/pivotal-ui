import '../spec_helper';
import {FlexCol} from '../../../src/react/flex-grids';

describe('FlexCol', () => {
  let subject;
  describe('alignment prop', () => {
    beforeEach(() => {
      subject = shallow(<FlexCol alignment="middle" />);
    });

    it('applies correct class name', () => {
      expect(subject.find('.col').hasClass('col-align-middle')).toBeTruthy();
    });
  });

  describe('breakpoint prop', () => {
    beforeEach(() => {
      subject = shallow(<FlexCol breakpoint="md" />);
    });

    it('applies correct class name', () => {
      expect(subject.find('.col').hasClass('col-md')).toBeTruthy();
    });
  });

  describe('col prop', () => {
    beforeEach(() => {
      subject = shallow(<FlexCol col={6}/>);
    });

    it('applies correct class name', () => {
      expect(subject.find('.col').hasClass('col-6')).toBeTruthy();
    });
  });

  describe('contentAlignment prop', () => {
    beforeEach(() => {
      subject = shallow(<FlexCol contentAlignment="middle" />);
    });

    it('applies correct class name', () => {
      expect(subject.find('.col').hasClass('col-middle')).toBeTruthy();
    });
  });

  describe('fixed prop', () => {
    beforeEach(() => {
      subject = shallow(<FlexCol fixed />);
    });

    it('applies correct class name', () => {
      expect(subject.find('.col').hasClass('col-fixed')).toBeTruthy();
    });
  });

  describe('grow prop', () => {
    beforeEach(() => {
      subject = shallow(<FlexCol grow={2} />);
    });

    it('applies correct class name', () => {
      expect(subject.find('.col').hasClass('col-grow-2')).toBeTruthy();
    });
  });
});
