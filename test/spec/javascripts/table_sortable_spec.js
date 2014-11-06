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
        name: 'name',
        title: 'Name'
      },
      {
        name: 'instances',
        title: 'Instances'
      }
    ];
    this.data = [
      {
        instances: '1',
        name: 'foo'
      },
      {
        instances: '3',
        name: 'sup'
      },
      {
        name: 'yee',
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

  it('sorts table rows by asc-name by default', function() {
    expect($('th:contains("Name")').hasClass('sorted-asc')).toBeTruthy();
    expect($('td')[0].innerHTML).toEqual('foo');
    expect($('td')[1].innerHTML).toEqual('1');
    expect($('td')[2].innerHTML).toEqual('sup');
    expect($('td')[3].innerHTML).toEqual('3');
    expect($('td')[4].innerHTML).toEqual('yee');
    expect($('td')[5].innerHTML).toEqual('2');
  });

  describe('clicking on the already asc-sorted column', function() {
    beforeEach(function() {
      TestUtils.Simulate.click($("th:contains('Name')").get(0));
    });

    it('reverses the sort order', function() {
      expect($('th:contains("Name")').hasClass('sorted-desc')).toBeTruthy();
      expect($('td')[0].innerHTML).toEqual('yee');
      expect($('td')[1].innerHTML).toEqual('2');
      expect($('td')[2].innerHTML).toEqual('sup');
      expect($('td')[3].innerHTML).toEqual('3');
      expect($('td')[4].innerHTML).toEqual('foo');
      expect($('td')[5].innerHTML).toEqual('1');
    });

    describe('clicking on the already desc-sorted column', function() {
      beforeEach(function() {
        TestUtils.Simulate.click($("th:contains('Name')").get(0));
      });

      it('reverses the sort order', function() {
        expect($('th:contains("Name")').hasClass('sorted-asc')).toBeTruthy();
        expect($('td')[0].innerHTML).toEqual('foo');
        expect($('td')[1].innerHTML).toEqual('1');
        expect($('td')[2].innerHTML).toEqual('sup');
        expect($('td')[3].innerHTML).toEqual('3');
        expect($('td')[4].innerHTML).toEqual('yee');
        expect($('td')[5].innerHTML).toEqual('2');
      });
    });
  });

  describe('clicking on the instances column', function() {
    beforeEach(function() {
      TestUtils.Simulate.click($("th:contains('Instances')").get(0));
    });

    it('sorts table rows by asc-instances', function() {
      expect($('th:contains("Instances")').hasClass('sorted-asc')).toBeTruthy();
      expect($('th:contains("Name")').hasClass('sorted-asc')).toBeFalsy();
      expect($('td')[0].innerHTML).toEqual('foo');
      expect($('td')[1].innerHTML).toEqual('1');
      expect($('td')[2].innerHTML).toEqual('yee');
      expect($('td')[3].innerHTML).toEqual('2');
      expect($('td')[4].innerHTML).toEqual('sup');
      expect($('td')[5].innerHTML).toEqual('3');
    });
  });
});

