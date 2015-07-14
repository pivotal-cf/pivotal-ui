require('../spec_helper');
import {SortableTable, TableCell, TableHeader, TableRow} from '../../../src/pivotal-ui-react/sortable-table/sortable-table';

describe('SortableTable', function() {
  var headers, clickSpy;

  const data = [
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

  function renderSortableTable(data, props = {}) {
    clickSpy = jasmine.createSpy('click');
    headers = [
      <TableHeader sortable={true} onClick={clickSpy}>Title</TableHeader>,
      <TableHeader sortable={true}>Instances</TableHeader>,
      <TableHeader>Unsortable</TableHeader>
    ];

    React.render((
        <SortableTable headers={headers} {...props}>
          {data.map(function(datum, key) {
            return (
              <TableRow key={key}>
                <TableCell>{datum.title}</TableCell>
                <TableCell>{datum.instances}</TableCell>
                <TableCell>{datum.unsortable}</TableCell>
              </TableRow>
            );
          })}
        </SortableTable>
      ),
      root
    );
  }

  beforeEach(function() {
    renderSortableTable(data);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('adds the class "sortable" on all sortable columns', function() {
    expect('th:contains("Title")').toHaveClass('sortable');
    expect('th:contains("Instances")').toHaveClass('sortable');
    expect('th:contains("Unsortable")').not.toHaveClass('sortable');
  });

  it('adds the additional classes, id and styles to the table', function() {
    renderSortableTable(data, {className: ['table-light'], id: 'table-id', style: {opacity: '0.5'}});
    expect('table.table-sortable').toHaveClass('table');
    expect('table.table-sortable').toHaveClass('table-sortable');
    expect('table.table-sortable').toHaveClass('table-light');
    expect('table.table-sortable').toHaveProp('id', 'table-id');
    expect('table.table-sortable').toHaveCss({opacity: '0.5'});
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

  describe('clicking on the already asc-sorted column that has an existing onClick function', function() {
    beforeEach(function() {
      $('th:contains("Title")').simulate('click');
    });

    it('calls the onClick function', function() {
      expect(clickSpy).toHaveBeenCalled();
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
        clickSpy.calls.reset();
        $('th:contains("Title")').simulate('click');
      });

      it('calls the onClick function', function() {
        expect(clickSpy).toHaveBeenCalled();
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

  describe('when the rows change', function() {
    beforeEach(function() {
      var newData = data.concat({
        title: 'new title',
        instances: '3',
        unsortable: '1'
      });
      renderSortableTable(newData);
    });

    it('shows the new rows in the correct sort order', function() {
      expect('tbody tr').toHaveLength(4);
      var titles = $('tbody tr > td:first-child').map(function() {return $(this).text(); }).toArray();
      expect(titles).toEqual(['foo', 'new title', 'sup', 'yee']);
    });
  });
});

describe('TableHeader', function() {
  function renderTableHeader({children, ...props}) {
    return React.render((
        <table>
          <thead>
            <tr>
              <TableHeader {...props}>
                {children}
              </TableHeader>
            </tr>
          </thead>
        </table>
      ), root
    );

  }

  it('contains the given children', function() {
    renderTableHeader({children: (<p id={'header-id'}></p>)});
    expect('th').toExist();
    expect('th > p#header-id').toExist();
  });

  describe('when the header is sortable', function() {
    const props = {
      sortable: true,
      id: 'header-id',
      className: 'header-light',
      style: {opacity: '0.5'}
    };

    it('adds the additional classes, id and styles to the th', function() {
      renderTableHeader(props);
      expect('th').toHaveClass('sortable');
      expect('th').toHaveClass('header-light');
      expect('th').toHaveProp('id', 'header-id');
      expect('th').toHaveCss({opacity: '0.5'});
    });

    describe('when there is an onSortableTableHeaderClick provided', function() {
      var onSortableTableHeaderClickSpy;
      beforeEach(function() {
        onSortableTableHeaderClickSpy = jasmine.createSpy('onSortableTableHeaderClick');
        renderTableHeader({onSortableTableHeaderClick: onSortableTableHeaderClickSpy, ...props});
      });

      describe('when clicking on the table header', function() {
        it('calls the callback', function() {
          $('th').simulate('click');
          expect(onSortableTableHeaderClickSpy).toHaveBeenCalled();
        });
      });
    });
  });

  describe('when the header is not sortable', function() {
    it('adds the additional classes, id and styles to the th', function() {
      renderTableHeader({
        sortable: false,
        id: 'header-id',
        className: 'header-light',
        style: {opacity: '0.5'}
      });
      expect('th').not.toHaveClass('sortable');
      expect('th').toHaveClass('header-light');
      expect('th').toHaveProp('id', 'header-id');
      expect('th').toHaveCss({opacity: '0.5'});
    });
  });
});

describe('TableRow', function() {
  function renderTableRow({children=(<td></td>), ...props}) {
    return React.render((
        <table>
          <tbody>
            <TableRow {...props}>
              {children}
            </TableRow>
          </tbody>
        </table>
      ), root
    );

  }
  it('contains the given children', function() {
    renderTableRow({children: (<td id={'cell-id'}></td>)});
    expect('tr').toExist();
    expect('tr > td#cell-id').toExist();
  });


  it('adds the additional classes, id and styles to the th', function() {
    renderTableRow({
      id: 'row-id',
      className: 'row-light',
      style: {opacity: '0.5'}
    });
    expect('tr').toHaveClass('row-light');
    expect('tr').toHaveProp('id', 'row-id');
    expect('tr').toHaveCss({opacity: '0.5'});
  });
});

describe('TableCell', function() {
  function renderTableCell({children, ...props}) {
    return React.render((
        <table>
          <tbody>
            <tr>
              <TableCell {...props}>
                {children}
              </TableCell>
            </tr>
          </tbody>
        </table>
      ), root
    );

  }

  it('contains the given children', function() {
    renderTableCell({children: (<p>This is my text</p>)});
    expect('td').toExist();
    expect('td > p').toExist();
    expect('td > p').toContainText('This is my text');
  });

  it('adds the additional classes, id and styles to the th', function() {
    renderTableCell({
      id: 'cell-id',
      className: 'cell-light',
      style: {opacity: '0.5'}
    });
    expect('td').toHaveClass('cell-light');
    expect('td').toHaveProp('id', 'cell-id');
    expect('td').toHaveCss({opacity: '0.5'});
  });
});
