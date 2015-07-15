require('../spec_helper');
import {propagateAttributes} from '../spec_helper';

describe('lists', function() {
  var UnorderedList = require('../../../src/pivotal-ui-react/lists/lists').UnorderedList;
  var OrderedList = require('../../../src/pivotal-ui-react/lists/lists').OrderedList;
  var ListItem = require('../../../src/pivotal-ui-react/lists/lists').ListItem;
  var BreadcrumbList = require('../../../src/pivotal-ui-react/lists/lists').BreadcrumbList;
  var StepList = require('../../../src/pivotal-ui-react/lists/lists').StepList;
  var GroupList = require('../../../src/pivotal-ui-react/lists/lists').GroupList;
  var GroupListInverse = require('../../../src/pivotal-ui-react/lists/lists').GroupListInverse;
  var InlineList = require('../../../src/pivotal-ui-react/lists/lists').InlineList;

  function itRenders(Element, props = {}, listItemProps={}) {
    beforeEach(function() {
      React.render(
        <Element {...props}>
          <ListItem{...listItemProps}>A</ListItem>
          <ListItem>B</ListItem>
        </Element>,
        root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('renders', function() {
      expect('#root li').toHaveLength(2);
    });
  }

  describe('UnorderedList', function() {
    itRenders(UnorderedList);

    it('adds list-unordered class', function() {
      expect('#root ul').toHaveClass('list-unordered');
    });
  });

  describe('OrderedList', function() {
    itRenders(OrderedList);
  });

  describe('Checked List', function(){
    itRenders(UnorderedList, {'checked': true});

    it('adds list-checked class', function() {
      expect('#root ul').toHaveClass('list-checked');
    });
  });

  describe('Unstyled List', function(){
    itRenders(UnorderedList, {'unstyled': true});

    it('adds the list-unstyled class', function() {
      expect('#root ul').toHaveClass('list-unstyled');
    });
  });

  describe('BreadcrumbList', function(){
    itRenders(BreadcrumbList);

    it('adds the list-breadcrumb class', function() {
      expect('#root ul').toHaveClass('list-breadcrumb');
    });
  });

  describe('StepList', function(){
    itRenders(StepList);

    it('adds the list-steps class', function(){
      expect('#root ol').toHaveClass('list-steps');
    });
  });

  describe('GroupList', function(){
    itRenders(GroupList);

    it('adds the list-group class', function(){
      expect('#root ul').toHaveClass('list-group');
      expect('#root ul li:first').toHaveClass('list-group-item');
    });
  });

  describe('GroupListInverse', function(){
    itRenders(GroupListInverse);

    it('adds the list-group-inverse class', function(){
      expect('#root ul').toHaveClass('list-group-inverse');
      expect('#root ul li:first').toHaveClass('list-group-item');
    });
  });

  describe('InlineList without divider', function(){
    itRenders(InlineList);

    it('adds list-inline classes', function(){
      expect('#root ul').toHaveClass('list-inline');
      expect('#root ul').not.toHaveClass('list-inline-divider');
    });
  });

  describe('InlineList with divider', function(){
    itRenders(InlineList, {'divider': true});

    it('adds list-inline-divider classes', function(){
      expect('#root ul').toHaveClass('list-inline-divider');
    });
  });

  describe('List spacing', function(){
    ['n', 's', 'm', 'l', 'xl'].forEach(function(size){
      describe('vertical spacing', function() {
        itRenders(UnorderedList, {'spacing': size});

        it('adds a' + size + 'vertical spacing class', function(){
          expect('#root ul').toHaveClass('lv' + size);
        });
      });

      describe('horizontal spacing', function() {
        itRenders(InlineList, {'spacing': size});

        it('adds a' + size + 'horizontal spacing class', function(){
          expect('#root ul').toHaveClass('lh' + size);
        });
      });
    });
  });

  describe('List custom attributes', function() {
    itRenders(UnorderedList, {
      className: 'foo-list',
      id: '12345',
      style: {
        padding: '5px'
      }
    });
    it('renders custom attributes on lists', function () {
      expect('#root ul').toHaveClass('foo-list');
      expect('#root ul').toHaveClass('list-unordered');
      expect('#root ul').toHaveAttr('id', '12345');
      expect('#root ul').toHaveAttr('style', 'padding:5px;');
    });
  });

  describe('ListItem', () => {
    const props = {className: 'foo-list-item',
      id: '12345',
      style: {
        opacity: '1'
      }};
    itRenders(UnorderedList, {}, props);
    propagateAttributes('#root ul li:first', props);
  });


});

