require('../spec_helper');
describe('SortableTable', function() {
  var SortableTable, data, columns;
  beforeEach(function() {
    SortableTable = require('../../../src/pivotal-ui-react/sortable-table/sortable-table').SortableTable;
    columns = [
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
    data = [
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

    React.render(<SortableTable {...{data, columns}}/>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('adds the class "sortable" on all sortable columns', function() {
    expect('th:contains("Title")').toHaveClass('sortable');
    expect('th:contains("Instances")').toHaveClass('sortable');
    expect('th:contains("Unsortable")').not.toHaveClass('sortable');
  });

  it('adds the additional classes specified in the "classes" property', function() {
    React.render(<SortableTable {...{data, columns, classes: ['table-light']}}/>, root);

    expect('table.table-sortable').toHaveClass('table');
    expect('table.table-sortable').toHaveClass('table-sortable');
    expect('table.table-sortable').toHaveClass('table-light');
  });

  it('column data is aligned to the specified margin', function() {
    expect('tbody tr:nth-of-type(1) > td:eq(0)').not.toHaveClass('txt-l');
    expect('tbody tr:nth-of-type(2) > td:eq(1)').toHaveClass('txt-c');
    expect('tbody tr:nth-of-type(1) > td:eq(2)').toHaveClass('txt-r');
  });

  it('sorts table rows by the first column in ascending order by default', function() {
    expect('th:contains("Title")').toHaveClass('sorted-asc');

    expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('foo');
    expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('sup');
    expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('yee');

    expect('tbody tr:nth-of-type(1) > td:eq(1)').toContainText('1');
    expect('tbody tr:nth-of-type(2) > td:eq(1)').toContainText('3');
    expect('tbody tr:nth-of-type(3) > td:eq(1)').toContainText('2');
  });

  describe('clicking on the already asc-sorted column', function() {
    beforeEach(function() {
      $('th:contains("Title")').simulate('click');
    });

    it('reverses the sort order', function() {
      expect('th:contains("Title")').toHaveClass('sorted-desc');

      expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('yee');
      expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('sup');
      expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('foo');

      expect('tbody tr:nth-of-type(1) > td:eq(1)').toContainText('2');
      expect('tbody tr:nth-of-type(2) > td:eq(1)').toContainText('3');
      expect('tbody tr:nth-of-type(3) > td:eq(1)').toContainText('1');
    });

    describe('clicking on the already desc-sorted column', function() {
      beforeEach(function() {
        $('th:contains("Title")').simulate('click');
      });

      it('reverses the sort order', function() {
        expect('th:contains("Title")').toHaveClass('sorted-asc');

        expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('foo');
        expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('sup');
        expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('yee');

        expect('tbody tr:nth-of-type(1) > td:eq(1)').toContainText('1');
        expect('tbody tr:nth-of-type(2) > td:eq(1)').toContainText('3');
        expect('tbody tr:nth-of-type(3) > td:eq(1)').toContainText('2');
      });
    });
  });

  describe('clicking on a sortable column', function() {
    beforeEach(function() {
      $('th:contains("Instances")').simulate('click');
    });

    it('sorts table rows by that column', function() {
      expect('th:contains("Instances")').toHaveClass('sorted-asc');
      expect('th:contains("Title")').not.toHaveClass('sorted-asc');

      expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('foo');
      expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('yee');
      expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('sup');

      expect('tbody tr:nth-of-type(1) > td:eq(1)').toContainText('1');
      expect('tbody tr:nth-of-type(2) > td:eq(1)').toContainText('2');
      expect('tbody tr:nth-of-type(3) > td:eq(1)').toContainText('3');
    });
  });

  describe('clicking on a non-sortable column', function() {
    beforeEach(function() {
      $('th:contains("Unsortable")').simulate('click');
    });

    it('does not change the sort', function() {
      expect('th:contains("Unsortable")').not.toHaveClass('sorted-asc');
      expect('th:contains("Title")').toHaveClass('sorted-asc');

      expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('foo');
      expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('sup');
      expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('yee');

      expect('tbody tr:nth-of-type(1) > td:eq(1)').toContainText('1');
      expect('tbody tr:nth-of-type(2) > td:eq(1)').toContainText('3');
      expect('tbody tr:nth-of-type(3) > td:eq(1)').toContainText('2');
    });
  });
});

