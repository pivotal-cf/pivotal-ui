'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var TableSortable = React.createFactory(require('../../../src/pivotal-ui/javascripts/table-sortable.jsx'));

describe('TableSortable', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    this.columns = [
      {
        name: 'title',
        title: 'Title',
        sortable: true
      },
      {
        name: 'instances',
        title: 'Instances',
        sortable: true,
        align: 'center'
      },
      {
        name: 'unsortable',
        title: 'Unsortable',
        sortable: false,
        align: 'right'
      }
    ];
    this.data = [
      {
        instances: '1',
        title: 'foo',
        unsortable: '14'
      },
      {
        instances: '3',
        title: 'sup',
        unsortable: '22'
      },
      {
        title: 'yee',
        instances: '2',
        unsortable: '1'
      }
    ];

    this.table = React.render(
      TableSortable({
        data: this.data,
        columns: this.columns
      }),
      this.node
    );

    this.$table = $('#container table.table-sortable');
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
  });

  it('adds the class "sortable" on all sortable columns', function() {
    expect(this.$table.find('th:contains("Title")')).toHaveClass('sortable');
    expect(this.$table.find('th:contains("Instances")')).toHaveClass('sortable');
    expect(this.$table.find('th:contains("Unsortable")')).not.toHaveClass('sortable');
  });

  it('adds the additional classes specified in the "classes" property', function() {
    this.tableSortable = TableSortable({
      data: this.data,
      columns: this.columns,
      classes: ['table-light']
    });
    React.render(this.tableSortable, this.node);
    this.$table = $('#container table.table-sortable');

    expect(this.$table).toHaveClass('table');
    expect(this.$table).toHaveClass('table-sortable');

    expect(this.$table).toHaveClass('table-light');
  });

  it('column data is aligned to the specified margin', function (){
    expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(0)).not.toHaveClass('txt-l');
    expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(1)).toHaveClass('txt-c');
    expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(2)).toHaveClass('txt-r');
  });

  it('sorts table rows by the first column in ascending order by default', function() {
    expect(this.$table.find('th:contains("Title")')).toHaveClass('sorted-asc');

    expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(0)).toContainText('foo');
    expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(0)).toContainText('sup');
    expect(this.$table.find('tbody tr:nth-of-type(3) > td').eq(0)).toContainText('yee');

    expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(1)).toContainText('1');
    expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(1)).toContainText('3');
    expect(this.$table.find('tbody tr:nth-of-type(3) > td').eq(1)).toContainText('2');
  });

  describe('clicking on the already asc-sorted column', function() {
    beforeEach(function() {
      TestUtils.Simulate.click(this.$table.find('th:contains("Title")').get(0));
    });

    it('reverses the sort order', function() {
      expect(this.$table.find('th:contains("Title")')).toHaveClass('sorted-desc');

      expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(0)).toContainText('yee');
      expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(0)).toContainText('sup');
      expect(this.$table.find('tbody tr:nth-of-type(3) > td').eq(0)).toContainText('foo');

      expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(1)).toContainText('2');
      expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(1)).toContainText('3');
      expect(this.$table.find('tbody tr:nth-of-type(3) > td').eq(1)).toContainText('1');
    });

    describe('clicking on the already desc-sorted column', function() {
      beforeEach(function() {
        TestUtils.Simulate.click(this.$table.find('th:contains("Title")').get(0));
      });

      it('reverses the sort order', function() {
        expect(this.$table.find('th:contains("Title")')).toHaveClass('sorted-asc');

        expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(0)).toContainText('foo');
        expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(0)).toContainText('sup');
        expect(this.$table.find('tbody tr:nth-of-type(3) > td').eq(0)).toContainText('yee');

        expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(1)).toContainText('1');
        expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(1)).toContainText('3');
        expect(this.$table.find('tbody tr:nth-of-type(3) > td').eq(1)).toContainText('2');
      });
    });
  });

  describe('clicking on a sortable column', function() {
    beforeEach(function() {
      TestUtils.Simulate.click(this.$table.find('th:contains("Instances")').get(0));
    });

    it('sorts table rows by that column', function() {
      expect(this.$table.find('th:contains("Instances")')).toHaveClass('sorted-asc');
      expect(this.$table.find('th:contains("Title")')).not.toHaveClass('sorted-asc');

      expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(0)).toContainText('foo');
      expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(0)).toContainText('yee');
      expect(this.$table.find('tbody tr:nth-of-type(3) > td').eq(0)).toContainText('sup');

      expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(1)).toContainText('1');
      expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(1)).toContainText('2');
      expect(this.$table.find('tbody tr:nth-of-type(3) > td').eq(1)).toContainText('3');
    });
  });

  describe('clicking on a non-sortable column', function() {
    beforeEach(function() {
      TestUtils.Simulate.click(this.$table.find('th:contains("Unsortable")').get(0));
    });

    it('does not change the sort', function() {
      expect(this.$table.find('th:contains("Unsortable")')).not.toHaveClass('sorted-asc');
      expect(this.$table.find('th:contains("Title")')).toHaveClass('sorted-asc');

      expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(0)).toContainText('foo');
      expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(0)).toContainText('sup');
      expect(this.$table.find('tbody tr:nth-of-type(3) > td').eq(0)).toContainText('yee');

      expect(this.$table.find('tbody tr:nth-of-type(1) > td').eq(1)).toContainText('1');
      expect(this.$table.find('tbody tr:nth-of-type(2) > td').eq(1)).toContainText('3');
      expect(this.$table.find('tbody tr:nth-of-type(3) > td').eq(1)).toContainText('2');
    });
  });
});

