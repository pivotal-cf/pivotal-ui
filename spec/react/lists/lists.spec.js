import React from 'react';
import ReactDOM from 'react-dom';
import {mergeProps} from '../../../src/react/helpers';
import {UnorderedList, OrderedList, ListItem, BreadcrumbList, InlineList} from '../../../src/react/lists';

describe('lists', () => {
  function itRenders(Element, identifier, props = {}) {
    const testProps = {
      className: 'test-class',
      id: 'test-id',
      style: {
        opacity: '0.75'
      }
    };

    beforeEach(() => {
      ReactDOM.render(
        <Element {...mergeProps(props, testProps)}>
          <ListItem>A</ListItem>
          <ListItem>B</ListItem>
        </Element>,
        root);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('renders', () => {
      expect('#root li').toHaveLength(2);
    });

    it('adds given attributes to the correct component', () => {
      expect(identifier).toHaveClass(testProps.className);
      expect(identifier).toHaveAttr('id', testProps.id);
      expect(identifier).toHaveCss(testProps.style);
    });
  }

  describe('UnorderedList without divider', () => {
    itRenders(UnorderedList, '#root ul');

    it('adds list-unordered class', () => {
      expect('#root ul').toHaveClass('list-unordered');
      expect('#root ul').not.toHaveClass('list-divider');
    });
  });

  describe('UnorderList with divider', () => {
    itRenders(UnorderedList, '#root ul', {'divider': true});

    it('adds list-divider class', () => {
      expect('#root ul').toHaveClass('list-divider');
    });
  });

  describe('OrderedList without divider', () => {
    itRenders(OrderedList, '#root ol');

    it('does not add the list-divider class', () => {
      expect('#root ol').not.toHaveClass('list-divider');
    });
  });

  describe('OrderedList with divider', () => {
    itRenders(OrderedList, '#root ol', {divider: true});

    it('does not add the list-divider class', () => {
      expect('#root ol').toHaveClass('list-divider');
    });
  });

  describe('Unstyled List', () => {
    itRenders(UnorderedList, '#root ul', {'unstyled': true});

    it('adds the list-unstyled class', () => {
      expect('#root ul').toHaveClass('list-unstyled');
    });
  });

  describe('BreadcrumbList', () => {
    itRenders(BreadcrumbList, '#root ul');

    it('adds the list-breadcrumb class', () => {
      expect('#root ul').toHaveClass('list-breadcrumb');
    });
  });

  describe('InlineList without divider', () => {
    itRenders(InlineList, '#root ul');

    it('adds list-inline classes', () => {
      expect('#root ul').toHaveClass('list-inline');
      expect('#root ul').not.toHaveClass('list-inline-divider');
    });
  });

  describe('List which is inline with divider', () => {
    itRenders(InlineList, '#root ul', {'divider': true});

    it('adds list-inline-divider classes', () => {
      expect('#root ul').toHaveClass('list-inline-divider');
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
      ReactDOM.render(
        <ul>
          <ListItem {...testItemProps}>A</ListItem>
        </ul>,
        root
      );
    });

    it('adds given attributes to the correct component', () => {
      expect('#root li:first').toHaveClass(testItemProps.className);
      expect('#root li:first').toHaveAttr('id', testItemProps.id);
      expect('#root li:first').toHaveCss(testItemProps.style);
    });
  });
});

