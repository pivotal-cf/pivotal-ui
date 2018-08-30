import '../spec_helper' ;
import {mergeProps} from '../../../src/react/helpers';
import {UnorderedList, OrderedList, ListItem, BreadcrumbList, InlineList} from '../../../src/react/lists';

describe('lists', () => {
  let subject;
  function itRenders(Element, identifier, props = {}) {
    const testProps = {
      className: 'test-class',
      id: 'test-id',
      style: {
        opacity: '0.75'
      }
    };

    beforeEach(() => {
      subject = shallow(<Element {...mergeProps(props, testProps)}>
        <ListItem>A</ListItem>
        <ListItem>B</ListItem>
      </Element>);
    });

    afterEach(() => {
      // ReactDOM.unmountComponentAtNode(root); // TODO: remove?
    });

    it('renders', () => {
      expect('#root li').toHaveLength(2);
    });

    it('adds given attributes to the correct component', () => {
      expect(subject.find(identifier).hasClass(testProps.className)).toBeTruthy();
      expect(subject.find(identifier).prop('id')).toBe(testProps.id);
      expect(subject.find(identifier).prop('style')).toEqual(testProps.style);
    });
  }

  describe('UnorderedList without divider', () => {
    itRenders(UnorderedList, '#root ul');

    it('adds list-unordered class', () => {
      expect(subject.find('#root ul').hasClass('list-unordered')).toBeTruthy();
      expect(subject.find('#root ul').hasClass('list-divider')).toBeFalsy();
    });
  });

  describe('UnorderList with divider', () => {
    itRenders(UnorderedList, '#root ul', {'divider': true});

    it('adds list-divider class', () => {
      expect(subject.find('#root ul').hasClass('list-divider')).toBeTruthy();
    });
  });

  describe('OrderedList without divider', () => {
    itRenders(OrderedList, '#root ol');

    it('does not add the list-divider class', () => {
      expect(subject.find('#root ol').hasClass('list-divider')).toBeFalsy();
    });
  });

  describe('OrderedList with divider', () => {
    itRenders(OrderedList, '#root ol', {divider: true});

    it('does not add the list-divider class', () => {
      expect(subject.find('#root ol').hasClass('list-divider')).toBeTruthy();
    });
  });

  describe('Unstyled List', () => {
    itRenders(UnorderedList, '#root ul', {'unstyled': true});

    it('adds the list-unstyled class', () => {
      expect(subject.find('#root ul').hasClass('list-unstyled')).toBeTruthy();
    });
  });

  describe('BreadcrumbList', () => {
    itRenders(BreadcrumbList, '#root ul');

    it('adds the list-breadcrumb class', () => {
      expect(subject.find('#root ul').hasClass('list-breadcrumb')).toBeTruthy();
    });
  });

  describe('InlineList without divider', () => {
    itRenders(InlineList, '#root ul');

    it('adds list-inline classes', () => {
      expect(subject.find('#root ul').hasClass('list-inline')).toBeTruthy();
      expect(subject.find('#root ul').hasClass('list-inline-divider')).toBeFalsy();
    });
  });

  describe('List which is inline with divider', () => {
    itRenders(InlineList, '#root ul', {'divider': true});

    it('adds list-inline-divider classes', () => {
      expect(subject.find('#root ul').hasClass('list-inline-divider')).toBeTruthy();
    });
  });

  describe('ListItem', () => {
    const testItemProps = {
      className: 'test-item-class',
      id: 'test-item-id',
      style: {
        opacity: '0.5'
      }
    };

    beforeEach(() => {
      subject = shallow(<ul>
        <ListItem {...testItemProps}>A</ListItem>
      </ul>);
    });

    it('adds given attributes to the correct component', () => {
      expect(subject.find('#root li').at(0).hasClass(testItemProps.className)).toBeTruthy();
      expect(subject.find('#root li').at(0).prop('id')).toBe(testItemProps.id);
      expect(subject.find('#root li').at(0).prop('style')).toEqual(testItemProps.style);
    });
  });
});

