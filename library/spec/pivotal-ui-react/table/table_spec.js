require('../spec_helper');
import {Table, TableCell, TableHeader, TableRow} from '../../../src/pivotal-ui-react/table/table';

describe('Table', function() {
  it('respects default sort', function() {
    const columns = [
      {
        attribute: 'title',
        displayName: 'Title',
        sortable: true
      },
      {
        attribute: 'bar',
        displayName: 'Bar',
        sortable: true
      },
      {
        attribute: 'theDefault',
        displayName: 'DefaultSort',
        sortable: true
      }
    ];

    const data = [
      { title: 'foo', bar: 'a', theDefault: 3},
      { title: 'sup', bar: 'c', theDefault: 2},
      { title: 'yee', bar: 'b', theDefault: 1}
    ];

    ReactDOM.render((
        <Table columns={columns} data={data} defaultSort='theDefault'/>
      ),
      root
    );

    expect('tbody tr:nth-of-type(1) > td:eq(2)').toContainText(1);
    expect('tbody tr:nth-of-type(2) > td:eq(2)').toContainText(2);
    expect('tbody tr:nth-of-type(3) > td:eq(2)').toContainText(3);
  });

  it('retains the sorted column even when columns are removed', () => {
    const columns = [
      {
        attribute: 'title',
        displayName: 'Title',
        sortable: true
      },
      {
        attribute: 'bar',
        displayName: 'Bar',
        sortable: true
      },
      {
        attribute: 'theDefault',
        displayName: 'DefaultSort',
        sortable: true
      }
    ];

    const data = [
      { title: 'foo', bar: 'a', theDefault: 3},
      { title: 'sup', bar: 'c', theDefault: 2},
      { title: 'yee', bar: 'b', theDefault: 1}
    ];

    const subject = ReactDOM.render((
        <Table columns={columns} data={data} defaultSort='theDefault'/>
      ),
      root
    );

    expect('th:contains("DefaultSort")').toHaveClass('sorted-asc');

    subject::setProps({columns: [columns[1], columns[2]]});
    expect('th:contains("DefaultSort")').toHaveClass('sorted-asc');
  });

  it('does not render the data as an attribute', () => {
    const columns = [
      {
        attribute: 'title',
        displayName: 'Title',
        sortable: true
      },
      {
        attribute: 'bar',
        displayName: 'Bar',
        sortable: true
      },
      {
        attribute: 'theDefault',
        displayName: 'DefaultSort',
        sortable: true
      }
    ];

    const data = [
      { title: 'foo', bar: 'a', theDefault: 3},
      { title: 'sup', bar: 'c', theDefault: 2},
      { title: 'yee', bar: 'b', theDefault: 1}
    ];

    ReactDOM.render(<Table columns={columns} data={data}/>, root);

    expect('table').not.toHaveAttr('data');
  });

  describe('with multiple columns', function() {
    function renderSortableTable(columns, data, props = {}) {
      ReactDOM.render((
          <Table {...{columns, data}} {...props}/>
        ),
        root
      );
    }
    let data, columns, clickSpy;
    beforeEach(function() {
      clickSpy = jasmine.createSpy('click');
      columns = [
        {
          attribute: 'title',
          displayName: 'Title'
        },
        {
          attribute: 'instances',
          sortable: true,
          headerProps: {
            className: 'instance-header',
            onClick: clickSpy,
            id: 'instanceId'
          }
        },
        {
          attribute: 'bar',
          displayName: 'Foo',
          sortable: true
        },
        {
          attribute: 'unsortable',
          displayName: 'Unsortable',
          sortable: false
        }
      ];

      data = [
        {
          instances: '1',
          bar: 11,
          title: 'foo',
          unsortable: '14',
          notUsed: true
        },
        {
          instances: '3',
          bar: 7,
          title: 'sup',
          unsortable: '22'
        },
        {
          title: 'yee',
          instances: '2',
          bar: 8,
          unsortable: '1'
        }
      ];
      renderSortableTable(columns, data);
    });

    afterEach(function() {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('adds the class "sortable" on all sortable columns', function() {
      expect('th:contains("Title")').not.toHaveClass('sortable');
      expect('th:contains("instances")').toHaveClass('sortable');
      expect('th:contains("Unsortable")').not.toHaveClass('sortable');
    });

    it('adds the additional classes, id and styles to the table', function() {
      renderSortableTable(columns, data, {className: ['table-light'], id: 'table-id', style: {opacity: '0.5'}});
      expect('table.table-sortable').toHaveClass('table');
      expect('table.table-sortable').toHaveClass('table-sortable');
      expect('table.table-sortable').toHaveClass('table-light');
      expect('table.table-sortable').toHaveProp('id', 'table-id');
      expect('table.table-sortable').toHaveCss({opacity: '0.5'});
    });

    it('sorts table rows by the first sortable column in ascending order by default', function() {
      expect('th:contains("instances")').toHaveClass('sorted-asc');

      expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('foo');
      expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('yee');
      expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('sup');

      expect('tbody tr:nth-of-type(1) > td:eq(1)').toContainText('1');
      expect('tbody tr:nth-of-type(2) > td:eq(1)').toContainText('2');
      expect('tbody tr:nth-of-type(3) > td:eq(1)').toContainText('3');
    });

    it('passes header props into the headers', function() {
      expect('th:contains("instances")').toHaveClass('instance-header');
      expect('th:contains("instances")').toHaveAttr('id', 'instanceId');
      $('th:contains("instances")').simulate('click');
      expect(clickSpy).toHaveBeenCalled();
    });

    describe('clicking on a sortable column', function() {
      it('sorts table rows by that column', function() {
        $('th:contains("Foo")').simulate('click');

        expect('th:contains("Foo")').toHaveClass('sorted-asc');
        expect('th:contains("Foo") svg').toHaveClass('icon-arrow_drop_up');
        expect('th:contains("instances")').not.toHaveClass('sorted-asc');


        expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('sup');
        expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('yee');
        expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('foo');

        expect('tbody tr:nth-of-type(1) > td:eq(2)').toContainText('7');
        expect('tbody tr:nth-of-type(2) > td:eq(2)').toContainText('8');
        expect('tbody tr:nth-of-type(3) > td:eq(2)').toContainText('11');
      });

      it('sorts first by ASC, then DESC, then no sort', () => {
        $('th:contains("Foo")').simulate('click');
        expect('th:contains("Foo")').toHaveClass('sorted-asc');
        expect('th:contains("Foo") svg').toHaveClass('icon-arrow_drop_up');

        $('th:contains("Foo")').simulate('click');
        expect('th:contains("Foo")').toHaveClass('sorted-desc');
        expect('th:contains("Foo") svg').toHaveClass('icon-arrow_drop_down');

        $('th:contains("Foo")').simulate('click');
        expect('th:contains("Foo")').not.toHaveClass('sorted-asc');
        expect('th:contains("Foo")').not.toHaveClass('sorted-desc');
        expect('th:contains("Foo") svg').not.toExist();
      });

      it('wraps sorting options when clicking many times', () => {
        $('th:contains("Foo")').simulate('click');
        expect('th:contains("Foo")').toHaveClass('sorted-asc');
        expect('th:contains("Foo") svg').toHaveClass('icon-arrow_drop_up');
        $('th:contains("Foo")').simulate('click');
        $('th:contains("Foo")').simulate('click');
        $('th:contains("Foo")').simulate('click');
        expect('th:contains("Foo")').toHaveClass('sorted-asc');
        expect('th:contains("Foo") svg').toHaveClass('icon-arrow_drop_up');
      });

      it('renders in same order that it was passed in when "unsorted"', () => {
        renderSortableTable(
          columns,
          [
            {
              title: 'yee1',
              instances: '2',
              bar: 4,
              unsortable: '1'
            },
            {
              title: 'yee4',
              instances: '2',
              bar: 8,
              unsortable: '1'
            },
            {
              title: 'yee3',
              instances: '2',
              bar: 6,
              unsortable: '1'
            }
          ]
        );

        $('th:contains("Foo")').simulate('click');
        expect('th:contains("Foo")').toHaveClass('sorted-asc');
        $('th:contains("Foo")').simulate('click');
        expect('th:contains("Foo")').toHaveClass('sorted-desc');
        $('th:contains("Foo")').simulate('click');
        expect('th:contains("Foo")').not.toHaveClass('sorted-asc');
        expect('th:contains("Foo")').not.toHaveClass('sorted-desc');

        expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('yee1');
        expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('yee4');
        expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('yee3');
      });
    });

    describe('pressing <enter> on a sortable column', function() {
      beforeEach(function() {
        $('th:contains("Foo")').simulate('keyDown', {key: 'Enter'});
      });

      it('sorts table rows by that column', function() {
        expect('th:contains("Foo")').toHaveClass('sorted-asc');
        expect('th:contains("instances")').not.toHaveClass('sorted-asc');

        expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('sup');
        expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('yee');
        expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('foo');

        expect('tbody tr:nth-of-type(1) > td:eq(2)').toContainText('7');
        expect('tbody tr:nth-of-type(2) > td:eq(2)').toContainText('8');
        expect('tbody tr:nth-of-type(3) > td:eq(2)').toContainText('11');
      });
    });

    describe('pressing <space> on a sortable column', function() {
      beforeEach(function() {
        $('th:contains("Foo")').simulate('keyDown', {key: ' '});
      });

      it('does not sort table rows by that column', function() {
        expect('th:contains("Foo")').not.toHaveClass('sorted-asc');
        expect('th:contains("instances")').toHaveClass('sorted-asc');
      });
    });

    describe('clicking on a non-sortable column', function() {
      beforeEach(function() {
        $('th:contains("Unsortable")').simulate('click');
      });

      it('does not change the sort', function() {
        expect('th:contains("Unsortable")').not.toHaveClass('sorted-asc');
        expect('th:contains("instances")').toHaveClass('sorted-asc');

        expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('foo');
        expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('yee');
        expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('sup');

        expect('tbody tr:nth-of-type(1) > td:eq(1)').toContainText('1');
        expect('tbody tr:nth-of-type(2) > td:eq(1)').toContainText('2');
        expect('tbody tr:nth-of-type(3) > td:eq(1)').toContainText('3');
      });
    });

    describe('when the rows change', function() {
      beforeEach(function() {
        const newData = data.concat({
          title: 'new title',
          instances: '1.5',
          unsortable: '1',
          bar: '123'
        });
        renderSortableTable(columns, newData);
      });

      it('shows the new rows in the correct sort order', function() {
        expect('tbody tr').toHaveLength(4);
        var instances = $('tbody tr > td:nth-of-type(2)').map(function() {return $(this).text(); }).toArray();
        expect(instances).toEqual(['1', '1.5', '2', '3']);
      });
    });

    describe('when a column is added', () => {
      beforeEach(() => {
        renderSortableTable([...columns, {attribute: 'newField', displayName: 'new field', sortable: true}], data.map((d, i) => ({...d, newField: i})));
      });

      it('allows sorting on new columns', () => {
        $('th:contains("Foo")').simulate('click');
        $('th:contains("Foo")').simulate('click');
        expect('th:contains("Foo")').toHaveClass('sorted-desc');
        $('th:contains("new field")').simulate('click');
        expect('th:contains("new field")').toHaveClass('sorted-asc');
      });
    });

    describe('when a column is removed', () => {
      beforeEach(() => {
        renderSortableTable(columns.filter(c => c.attribute != 'instances'), data);
      });

      it('allows sorting on new columns', () => {
        expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('sup');
        expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('yee');
        expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('foo');
      });
    });
  });

  describe('with one column', function() {
    it('still renders', function() {
      const columns = [
        {
          attribute: 'title',
          displayName: 'Title',
          sortable: false
        }
      ];

      const data = [{title: 'foo'}, { title: 'sup'}, { title: 'yee'}];

      ReactDOM.render((
          <Table columns={columns} data={data} />
        ),
        root
      );

      expect('#root table').toContainText('sup');

      ReactDOM.unmountComponentAtNode(root);
    });
  });

  describe('with custom column cells', function() {
    beforeEach(function() {
      const CustomCell = ({value, index, rowDatum}) => <td className="custom">{`${rowDatum.instances}-${index}: ${value}`}</td>;
      CustomCell.propTypes = {value: React.PropTypes.any, index: React.PropTypes.number, rowDatum: React.PropTypes.object};
      const columns = [
        {
          attribute: 'title',
          displayName: 'Title',
          CustomCell
        },
        {
          attribute: 'instances',
          sortable: true
        }
      ];

      const data = [
        {
          instances: '1',
          bar: 11,
          title: 'foo',
          unsortable: '14',
          notUsed: true
        },
        {
          instances: '3',
          bar: 7,
          title: 'sup',
          unsortable: '22'
        }
      ];

      ReactDOM.render(
        <Table columns={columns} data={data}/>,
        root
      );
    });

    it('uses custom for the column', function() {
      expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('1-0: foo');
      expect('tbody tr:nth-of-type(1) > td:eq(0)').toHaveClass('custom');
      expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('3-1: sup');
      expect('tbody tr:nth-of-type(2) > td:eq(0)').toHaveClass('custom');
    });
  });

  describe('with custom column sortBy', function() {
    beforeEach(function() {
      const columns = [
        {
          attribute: 'title',
          displayName: 'Title'
        },
        {
          attribute: 'instances',
          sortable: true,
          sortBy: (value) => -value
        }
      ];

      const data = [
        {
          instances: '1',
          bar: 11,
          title: 'foo',
          unsortable: '14',
          notUsed: true
        },
        {
          instances: '3',
          bar: 7,
          title: 'sup',
          unsortable: '22'
        }
      ];

      ReactDOM.render(
        <Table columns={columns} data={data}/>,
        root
      );
    });

    it('uses custom sortBy function', function() {
      expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('sup');
      expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('foo');
    });
  });

  describe('with a custom table row', function() {
    beforeEach(function() {
      const CustomRow = ({index, children}) => {
        return (
          <TableRow className={`row-${index}`}>{children}</TableRow>
        );
      };
      CustomRow.propTypes = {index: React.PropTypes.number};

      const CustomCell = ({value}) => (
        <TableCell>Days since Sunday: {(new Date(value)).getDay()}</TableCell>
      );
      CustomCell.propTypes = {value: React.PropTypes.any};

      const columns = [
        {
          attribute: 'title',
          displayName: 'Title',
          sortable: false
        },
        {
          attribute: 'time',
          displayName: 'Time of Day',
          sortable: true,
          CustomCell
        }
      ];

      const data = [
        { title: 'foo', time: Date.parse('Tue Dec 08 2015') },
        { title: 'sup', time: Date.parse('Wed Dec 09 2015') },
        { title: 'yee', time: Date.parse('Mon Dec 07 2015') }
      ];

      ReactDOM.render((
          <Table columns={columns} data={data} CustomRow={CustomRow}/>
        ),
        root
      );
    });

    it('renders the custom cell', function() {
      expect('tbody tr:nth-of-type(1) > td:eq(0)').toContainText('yee');
      expect('tbody tr:nth-of-type(2) > td:eq(0)').toContainText('foo');
      expect('tbody tr:nth-of-type(3) > td:eq(0)').toContainText('sup');

      expect('tbody tr:nth-of-type(1) > td:eq(1)').toContainText('Days since Sunday: 1');
      expect('tbody tr:nth-of-type(2) > td:eq(1)').toContainText('Days since Sunday: 2');
      expect('tbody tr:nth-of-type(3) > td:eq(1)').toContainText('Days since Sunday: 3');
    });

    it('respects properties on the custom row', function() {
      expect('tbody tr:eq(0)').toHaveClass('row-0');
      expect('tbody tr:eq(1)').toHaveClass('row-1');
    });
  });

  describe('with no sortable columns', function() {
    it('does not assign sorted-asc or sorted-des to a column', function() {
      const columns = [
        {
          attribute: 'title',
          displayName: 'Title',
          sortable: false
        }
      ];

      const data = [{title: 'foo'}, { title: 'sup'}, { title: 'yee'}];

      ReactDOM.render((
          <Table columns={columns} data={data} />
        ),
        root
      );

      expect('th').not.toHaveClass('sorted-asc');
      expect('th').not.toHaveClass('sorted-desc');
      expect('th').not.toHaveAttr('role', 'button');
    });
  });
});

describe('TableHeader', function() {
  function renderTableHeader({children, ...props}) {
    return ReactDOM.render((
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
    renderTableHeader({children: (<p id={'header-id'}/>)});
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
      let onSortableTableHeaderClickSpy;
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
  function renderTableRow({children=(<td/>), ...props}) {
    return ReactDOM.render((
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
    renderTableRow({children: (<td id={'cell-id'}/>)});
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
    return ReactDOM.render((
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
