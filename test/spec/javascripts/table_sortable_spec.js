'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var TableSortable = require('../../../src/pivotal-ui/javascripts/table-sortable.jsx');

describe('TableSortable', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    this.columns = [
      {
        name: 'title',
        title: 'Title'
      },
      {
        name: 'instances',
        title: 'Instances'
      }
    ];
    this.data = [
      {
        instances: '1',
        title: 'foo'
      },
      {
        instances: '3',
        title: 'sup'
      },
      {
        title: 'yee',
        instances: '2'
      }
    ];

    this.table = React.renderComponent(
      TableSortable({
        data: this.data,
        columns: this.columns
      }),
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
  });

  it('sorts table rows by the first column in ascending order by default', function() {
    expect($('th:contains("Title")')).toHaveClass('sorted-asc');
    expect($('td').eq(0)).toContainText('foo');
    expect($('td').eq(1)).toContainText('1');
    expect($('td').eq(2)).toContainText('sup');
    expect($('td').eq(3)).toContainText('3');
    expect($('td').eq(4)).toContainText('yee');
    expect($('td').eq(5)).toContainText('2');
  });

  describe('clicking on the already asc-sorted column', function() {
    beforeEach(function() {
      TestUtils.Simulate.click($("th:contains('Title')").get(0));
    });

    it('reverses the sort order', function() {
      expect($('th:contains("Title")')).toHaveClass('sorted-desc');
      expect($('td').eq(0)).toContainText('yee');
      expect($('td').eq(1)).toContainText('2');
      expect($('td').eq(2)).toContainText('sup');
      expect($('td').eq(3)).toContainText('3');
      expect($('td').eq(4)).toContainText('foo');
      expect($('td').eq(5)).toContainText('1');
    });

    describe('clicking on the already desc-sorted column', function() {
      beforeEach(function() {
        TestUtils.Simulate.click($("th:contains('Title')").get(0));
      });

      it('reverses the sort order', function() {
        expect($('th:contains("Title")')).toHaveClass('sorted-asc');
        expect($('td').eq(0)).toContainText('foo');
        expect($('td').eq(1)).toContainText('1');
        expect($('td').eq(2)).toContainText('sup');
        expect($('td').eq(3)).toContainText('3');
        expect($('td').eq(4)).toContainText('yee');
        expect($('td').eq(5)).toContainText('2');
      });
    });
  });

  describe('clicking on the instances column', function() {
    beforeEach(function() {
      TestUtils.Simulate.click($("th:contains('Instances')").get(0));
    });

    it('sorts table rows by asc-instances', function() {
      expect($('th:contains("Instances")')).toHaveClass('sorted-asc');
      expect($('th:contains("Title")')).not.toHaveClass('sorted-asc');
      expect($('td').eq(0)).toContainText('foo');
      expect($('td').eq(1)).toContainText('1');
      expect($('td').eq(2)).toContainText('yee');
      expect($('td').eq(3)).toContainText('2');
      expect($('td').eq(4)).toContainText('sup');
      expect($('td').eq(5)).toContainText('3');
    });
  });
});

