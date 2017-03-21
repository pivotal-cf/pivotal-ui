import '../spec_helper' ;
import {itPropagatesAttributes} from '../support/shared_examples';
import {mergeProps} from 'pui-react-helpers';

describe('lists', function() {
  const UnorderedList = require('../../../src/pivotal-ui-react/lists/lists').UnorderedList;
  const OrderedList = require('../../../src/pivotal-ui-react/lists/lists').OrderedList;
  const ListItem = require('../../../src/pivotal-ui-react/lists/lists').ListItem;
  const BreadcrumbList = require('../../../src/pivotal-ui-react/lists/lists').BreadcrumbList;
  const StepList = require('../../../src/pivotal-ui-react/lists/lists').StepList;
  const GroupList = require('../../../src/pivotal-ui-react/lists/lists').GroupList;
  const GroupListInverse = require('../../../src/pivotal-ui-react/lists/lists').GroupListInverse;
  const InlineList = require('../../../src/pivotal-ui-react/lists/lists').InlineList;

  function itRenders(Element, identifier, props = {}) {
    const testProps = {
      className: 'test-class',
      id: 'test-id',
      style: {
        opacity: '0.75'
      }
    };

    beforeEach(function() {
      ReactDOM.render(
        <Element {...mergeProps(props, testProps)}>
          <ListItem>A</ListItem>
          <ListItem>B</ListItem>
        </Element>,
        root);
    });

    afterEach(function() {
      ReactDOM.unmountComponentAtNode(root);
    });

    itPropagatesAttributes(identifier, testProps);

    it('renders', function() {
      expect('#root li').toHaveLength(2);
    });
  }

  describe('UnorderedList', function() {
    itRenders(UnorderedList, '#root ul');

    it('adds list-unordered class', function() {
      expect('#root ul').toHaveClass('list-unordered');
    });
  });

  describe('OrderedList', function() {
    itRenders(OrderedList, '#root ol');
  });

  describe('Unstyled List', function(){
    itRenders(UnorderedList, '#root ul', {'unstyled': true});

    it('adds the list-unstyled class', function() {
      expect('#root ul').toHaveClass('list-unstyled');
    });
  });

  describe('BreadcrumbList', function(){
    itRenders(BreadcrumbList, '#root ul');

    it('adds the list-breadcrumb class', function() {
      expect('#root ul').toHaveClass('list-breadcrumb');
    });
  });

  describe('InlineList without divider', function(){
    itRenders(InlineList, '#root ul');

    it('adds list-inline classes', function(){
      expect('#root ul').toHaveClass('list-inline');
      expect('#root ul').not.toHaveClass('list-inline-divider');
    });
  });

  describe('List which is inline with divider', function(){
    itRenders(InlineList, '#root ul', {'divider': true});

    it('adds list-inline-divider classes', function(){
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

    beforeEach(function() {
      ReactDOM.render(
        <ul>
          <ListItem {...testItemProps}>A</ListItem>
        </ul>,
        root
      );
    });

    itPropagatesAttributes('#root li:first', testItemProps);
  });

});

