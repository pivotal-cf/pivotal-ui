require('../spec_helper')
import ReactTestUtils from 'react-addons-test-utils'
import {Table, TableHeader, TableCell, TableRow} from '../../../src/pivotal-ui-react/table/table'

describe('Table', function() {
  let columns, data

  const renderComponent = (columns, data, props) => ReactTestUtils.renderIntoDocument(<Table {...{columns, data}} {...props} />)

  beforeEach(() => {
    columns = [
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
    ]

    data = [
      { title: 'foo', bar: 'a', theDefault: 3},
      { title: 'sup', bar: 'c', theDefault: 2},
      { title: 'yee', bar: 'b', theDefault: 1}
    ]
  })

  it('respects default sort', function() {
    const result = renderComponent(columns, data, {defaultSort: 'theDefault'})
    const tableRows = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'tr')

    expect(tableRows[1].childNodes[2]).toHaveText('1')
    expect(tableRows[2].childNodes[2]).toHaveText('2')
    expect(tableRows[3].childNodes[2]).toHaveText('3')
  })

  it('does not render the data as an attribute', () => {
    const result = renderComponent(columns, data, {defaultSort: 'theDefault'})
    const table = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'table')

    expect(table).not.toHaveAttr('data')
  })

  describe('with multiple columns', function() {
    let clickSpy

    beforeEach(function() {
      clickSpy = jasmine.createSpy('click')
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
      ]

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
      ]
    })

    it('adds the class "sortable" on all sortable columns', function() {
      const result = renderComponent(columns, data)
      const tableHeaders = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'th')

      expect(tableHeaders[0]).not.toHaveClass('sortable')
      expect(tableHeaders[1]).toHaveClass('sortable')
      expect(tableHeaders[2]).toHaveClass('sortable')
      expect(tableHeaders[3]).not.toHaveClass('sortable')
    })

    it('adds the additional classes, id and styles to the table', function() {
      const result = renderComponent(columns, data, {className: ['table-light'], id: 'table-id', style: {opacity: '0.5'}})
      const sortableTable = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'table-sortable')

      expect(sortableTable).toBeDefined()
      expect(sortableTable).toHaveClass('table-light')
      expect(sortableTable).toHaveAttr('id', 'table-id')
      expect(sortableTable).toHaveCss({opacity: '0.5'})
    })

    it('sorts table rows by the first sortable column in ascending order by default', function() {
      const result = renderComponent(columns, data)
      const tableHeaders = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'th')

      expect(tableHeaders[1]).not.toHaveClass('sort-asc')

      const tableRows = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'tr')

      expect(tableRows[1].childNodes[0]).toHaveText('foo')
      expect(tableRows[2].childNodes[0]).toHaveText('yee')
      expect(tableRows[3].childNodes[0]).toHaveText('sup')

      expect(tableRows[1].childNodes[1]).toHaveText('1')
      expect(tableRows[2].childNodes[1]).toHaveText('2')
      expect(tableRows[3].childNodes[1]).toHaveText('3')
    })

    it('passes header props into the headers', function() {
      const result = renderComponent(columns, data)
      const tableHeaders = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'th')

      expect(tableHeaders[1]).toHaveClass('instance-header')
      expect(tableHeaders[1]).toHaveAttr('id', 'instanceId')

      ReactTestUtils.Simulate.click(tableHeaders[1])
      jasmine.clock().tick(1)
      expect(clickSpy).toHaveBeenCalled()
    })

    describe('clicking on a sortable column', function() {
      it('sorts table rows by that column', function() {
        const result = renderComponent(columns, data)
        const tableHeaders = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'th')

        ReactTestUtils.Simulate.click(tableHeaders[2])
        jasmine.clock().tick(1)
        expect(tableHeaders[2]).toHaveClass('sorted-asc')

        const svgs = tableHeaders[2].getElementsByTagName('svg')
        expect(svgs[0]).toHaveClass('icon-arrow_drop_up')

        expect(tableHeaders[1]).not.toHaveClass('sorted-asc')

        const tableRows = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'tr')

        expect(tableRows[1].childNodes[0]).toHaveText('sup')
        expect(tableRows[2].childNodes[0]).toHaveText('yee')
        expect(tableRows[3].childNodes[0]).toHaveText('foo')

        expect(tableRows[1].childNodes[2]).toHaveText('7')
        expect(tableRows[2].childNodes[2]).toHaveText('8')
        expect(tableRows[3].childNodes[2]).toHaveText('11')
      })

      it('sorts first by ASC, then DESC, then no sort', () => {
        const result = renderComponent(columns, data)
        const tableHeaders = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'th')

        ReactTestUtils.Simulate.click(tableHeaders[2])
        jasmine.clock().tick(1)
        expect(tableHeaders[2]).toHaveClass('sorted-asc')
        let svgs = tableHeaders[2].getElementsByTagName('svg')
        expect(svgs[0]).toHaveClass('icon-arrow_drop_up')

        ReactTestUtils.Simulate.click(tableHeaders[2])
        jasmine.clock().tick(1)
        expect(tableHeaders[2]).toHaveClass('sorted-desc')
        svgs = tableHeaders[2].getElementsByTagName('svg')
        expect(svgs[0]).toHaveClass('icon-arrow_drop_down')

        ReactTestUtils.Simulate.click(tableHeaders[2])
        jasmine.clock().tick(1)
        expect(tableHeaders[2]).not.toHaveClass('sorted-asc')
        expect(tableHeaders[2]).not.toHaveClass('sorted-desc')
        svgs = tableHeaders[2].getElementsByTagName('svg')
        expect(svgs.length).toEqual(0)
      })

      it('renders in same order that it was passed in when "unsorted"', () => {
        data = [
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

        const result = renderComponent(columns, data)
        const tableHeaders = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'th')

        ReactTestUtils.Simulate.click(tableHeaders[2])
        jasmine.clock().tick(1)
        ReactTestUtils.Simulate.click(tableHeaders[2])
        jasmine.clock().tick(1)
        ReactTestUtils.Simulate.click(tableHeaders[2])
        jasmine.clock().tick(1)

        expect(tableHeaders[2]).not.toHaveClass('sorted-asc')
        expect(tableHeaders[2]).not.toHaveClass('sorted-desc')

        const tableRows = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'tr')

        expect(tableRows[1].childNodes[0]).toHaveText('yee1')
        expect(tableRows[2].childNodes[0]).toHaveText('yee4')
        expect(tableRows[3].childNodes[0]).toHaveText('yee3')
      })
    })

    describe('pressing <enter> on a sortable column', function() {
      it('sorts table rows by that column', function() {
        const result = renderComponent(columns, data)
        const tableHeaders = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'th')

        ReactTestUtils.Simulate.keyDown(tableHeaders[2], {key: 'Enter'})
        jasmine.clock().tick(1)
        expect(tableHeaders[2]).toHaveClass('sorted-asc')
        expect(tableHeaders[1]).not.toHaveClass('sorted-asc')

        const tableRows = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'tr')

        expect(tableRows[1].childNodes[0]).toHaveText('sup')
        expect(tableRows[2].childNodes[0]).toHaveText('yee')
        expect(tableRows[3].childNodes[0]).toHaveText('foo')

        expect(tableRows[1].childNodes[2]).toHaveText('7')
        expect(tableRows[2].childNodes[2]).toHaveText('8')
        expect(tableRows[3].childNodes[2]).toHaveText('11')
      })
    })

    describe('clicking on a non-sortable column', function() {
      it('does not change the sort', function() {
        const result = renderComponent(columns, data)
        const tableHeaders = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'th')

        ReactTestUtils.Simulate.keyDown(tableHeaders[3], {key: 'Enter'})
        jasmine.clock().tick(1)
        expect(tableHeaders[3]).not.toHaveClass('sorted-asc')
        expect(tableHeaders[1]).toHaveClass('sorted-asc')

        const tableRows = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'tr')

        expect(tableRows[1].childNodes[0]).toHaveText('foo')
        expect(tableRows[2].childNodes[0]).toHaveText('yee')
        expect(tableRows[3].childNodes[0]).toHaveText('sup')

        expect(tableRows[1].childNodes[1]).toHaveText('1')
        expect(tableRows[2].childNodes[1]).toHaveText('2')
        expect(tableRows[3].childNodes[1]).toHaveText('3')
      })
    })
  })

  describe('with custom column cells', function() {
    let CustomCell
    beforeEach(function() {
      CustomCell = ({value, index, rowDatum}) => <td className="custom">{`${rowDatum.instances}-${index}: ${value}`}</td>
      CustomCell.propTypes = {value: React.PropTypes.any, index: React.PropTypes.number, rowDatum: React.PropTypes.object}

      columns = [
        {
          attribute: 'title',
          displayName: 'Title',
          CustomCell
        },
        {
          attribute: 'instances',
          sortable: true
        }
      ]

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
        }
      ]
    })

    it('uses custom for the column', function() {
      const result = renderComponent(columns, data)
      const tableRows = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'tr')

      expect(tableRows[1].childNodes[0]).toHaveText('1-0: foo')
      expect(tableRows[1].childNodes[0]).toHaveClass('custom')

      expect(tableRows[2].childNodes[0]).toHaveText('3-1: sup')
      expect(tableRows[2].childNodes[0]).toHaveClass('custom')
    })
  })

  describe('with custom column sortBy', function() {
    beforeEach(function() {
      columns = [
        {
          attribute: 'title',
          displayName: 'Title'
        },
        {
          attribute: 'instances',
          sortable: true,
          sortBy: (value) => -value
        }
      ]

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
        }
      ]
    })

    it('uses custom sortBy function', function() {
      const result = renderComponent(columns, data)
      const tableRows = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'tr')

      expect(tableRows[1].childNodes[0]).toHaveText('sup')
      expect(tableRows[2].childNodes[0]).toHaveText('foo')
    })
  })

  describe('with a custom table row', function() {
    const CustomRow = ({index, children}) => (<TableRow className={`row-${index}`}>{children}</TableRow>)
    CustomRow.propTypes = {index: React.PropTypes.number}

    const CustomCell = ({value}) => (<TableCell>Days since Sunday: {(new Date(value)).getDay()}</TableCell>)
    CustomCell.propTypes = {value: React.PropTypes.any}

    beforeEach(function() {
      columns = [
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
      ]

      data = [
        { title: 'foo', time: Date.parse('Tue Dec 08 2015') },
        { title: 'sup', time: Date.parse('Wed Dec 09 2015') },
        { title: 'yee', time: Date.parse('Mon Dec 07 2015') }
      ]
    })

    it('renders the custom cell', function() {
      const result = renderComponent(columns, data, {CustomRow: CustomRow})
      const tableRows = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'tr')

      expect(tableRows[1].childNodes[0]).toHaveText('yee')
      expect(tableRows[2].childNodes[0]).toHaveText('foo')
      expect(tableRows[3].childNodes[0]).toHaveText('sup')

      expect(tableRows[1].childNodes[1]).toHaveText('Days since Sunday: 1')
      expect(tableRows[2].childNodes[1]).toHaveText('Days since Sunday: 2')
      expect(tableRows[3].childNodes[1]).toHaveText('Days since Sunday: 3')
    })

    it('respects properties on the custom row', function() {
      const result = renderComponent(columns, data, {CustomRow: CustomRow})
      const tableRows = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'tr')

      expect(tableRows[1]).toHaveClass('row-0')
      expect(tableRows[2]).toHaveClass('row-1')
    })
  })
})

describe('TableRow', function() {
  const renderRow = (children, props) => ReactTestUtils.renderIntoDocument(
    <table>
      <tbody>
        <TableRow {...props}>{children}</TableRow>
      </tbody>
    </table>
  )

  it('contains the given children', function() {
    const result = renderRow(<td id={'cell-id'}/>)

    const renderedCells = result.getElementsByTagName('td')
    expect(renderedCells[0]).toHaveAttr('id', 'cell-id')
  })


  it('adds the additional classes, id and styles to the th', function() {
    const result = renderRow(<td id={'cell-id'}/>, {
        id: 'row-id',
        className: 'row-light',
        style: {opacity: '0.5'}
    })

    const renderedRows = result.getElementsByTagName('tr')
    expect(renderedRows[0]).toHaveClass('row-light')
    expect(renderedRows[0]).toHaveAttr('id', 'row-id')
    expect(renderedRows[0]).toHaveCss({opacity: '0.5'})
  })
})

describe('TableCell', function() {
  const renderCell = (children, props) => ReactTestUtils.renderIntoDocument(
    <table>
      <tbody>
      <tr>
        <TableCell {...props}>
          {children}
        </TableCell>
      </tr>
      </tbody>
    </table>
  )

  it('contains the given children', function() {
    const result = renderCell(<p>This is my text</p>)

    const renderedCells = result.getElementsByTagName('td')
    expect(renderedCells.length).toEqual(1)

    const renderedP = renderedCells[0].getElementsByTagName('p')
    expect(renderedP.length).toEqual(1)
    expect(renderedP[0]).toHaveText('This is my text')
  })

  it('adds the additional classes, id and styles to the th', function() {
    const result = renderCell(<p>This is my text</p>, {
      id: 'cell-id',
      className: 'cell-light',
      style: {opacity: '0.5'}
    })
    
    const renderedCells = result.getElementsByTagName('td')
    expect(renderedCells[0]).toHaveClass('cell-light')
    expect(renderedCells[0]).toHaveAttr('id', 'cell-id')
    expect(renderedCells[0]).toHaveCss({opacity: '0.5'})
  })
})
