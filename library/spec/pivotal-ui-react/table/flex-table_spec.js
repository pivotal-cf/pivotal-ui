require('../spec_helper');
import ReactTestUtils from 'react-addons-test-utils'
import {FlexTable, FlexTableCell, FlexTableRow} from '../../../src/pivotal-ui-react/table/table';

describe('Flex Table', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<FlexTable {...props}/>)

  describe('basic render and sort', () => {
    const columns = [
      {
        attribute: 'title',
        displayName: 'Title',
        sortable: false
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

    const data = [
      {title: 'foo', bar: 'a', theDefault: 3},
      {title: 'sup', bar: 'c', theDefault: 2},
      {title: 'yee', bar: 'b', theDefault: 1}
    ]

    it('renders the table with the expected styles and ids', () => {
      const component = renderComponent({
        columns,
        data,
        className: ['table-class'],
        id: 'table-id',
        style: {opacity: '0.5'}
      })

      const renderedTable = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'table')

      expect(renderedTable).toBeDefined()
      expect(renderedTable.classList).toContain('table-sortable');
      expect(renderedTable.classList).toContain('table-class');
      expect(renderedTable.id).toEqual('table-id');
      expect(renderedTable.style.opacity).toEqual('0.5')
    });

    it('adds the class "sortable" on all sortable columns', () => {
      const component = renderComponent({columns, data})
      const sortableColumns = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')

      expect(sortableColumns.length).toEqual(2)
      expect(sortableColumns[0].textContent).toEqual('Bar')
      expect(sortableColumns[1].textContent).toEqual('DefaultSort')
    });

    it('sorts table rows by the first sortable column with no default sort', () => {
      const component = renderComponent({columns, data})
      const renderedRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')
      expect(renderedRows[1].childNodes[1].textContent).toEqual('a')
      expect(renderedRows[2].childNodes[1].textContent).toEqual('b')
      expect(renderedRows[3].childNodes[1].textContent).toEqual('c')
    });

    it('respects default sort', () => {
      const component = renderComponent({columns, data, defaultSort: 'theDefault'})
      const renderedRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')

      expect(renderedRows.length).toEqual(4)
      renderedRows.map((row, index) => {
        if(index == 0) return
        expect(row.childNodes[2].textContent).toEqual(`${index}`)
      })
    })

    describe('clicking on a sortable column', () => {
      it('sorts table rows by that column', () => {
        const component = renderComponent({columns, data})
        const sortableColumns = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')

        ReactTestUtils.Simulate.click(sortableColumns[1])
        jasmine.clock().tick(1)

        const renderedRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')

        expect(renderedRows.length).toEqual(4)
        renderedRows.map((row, index) => {
          if(index == 0) return
          expect(row.childNodes[2].textContent).toEqual(`${index}`)
        })
      });

      it('sorts first by ASC, then DESC, then no sort', () => {
        const component = renderComponent({columns, data})
        let columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]

        ReactTestUtils.Simulate.click(columnToSort)
        jasmine.clock().tick(1)
        columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]
        let svg = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'svg')
        expect(columnToSort.classList).toContain('sorted-asc')
        expect(svg.classList).toContain('icon-arrow_drop_up')

        ReactTestUtils.Simulate.click(columnToSort)
        jasmine.clock().tick(1)
        columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]
        svg = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'svg')
        expect(columnToSort.classList).toContain('sorted-desc')
        expect(svg.classList).toContain('icon-arrow_drop_down')

        ReactTestUtils.Simulate.click(columnToSort)
        jasmine.clock().tick(1)
        columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]
        const svgs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'svg')
        expect(svgs.length).toEqual(0)
        columnToSort.classList.forEach(klass => expect(klass).not.toMatch(/sorted/))
      });

      describe('when a sortable column is clicked 3 times (i.e., "unsorted")', () => {
        it('sorts according to the original order', () => {
          const component = renderComponent({columns, data})
          let columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[0]

          ReactTestUtils.Simulate.click(columnToSort)
          jasmine.clock().tick(1)
          columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[0]

          ReactTestUtils.Simulate.click(columnToSort)
          jasmine.clock().tick(1)
          columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[0]

          const renderedRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')
          expect(renderedRows[1].childNodes[1].textContent).toEqual('a')
          expect(renderedRows[2].childNodes[1].textContent).toEqual('c')
          expect(renderedRows[3].childNodes[1].textContent).toEqual('b')
        })
      })
    })

    describe('pressing <enter> on a sortable column', () => {
      it('sorts first by ASC, then DESC, then no sort', () => {
        const component = renderComponent({columns, data})
        let columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]

        ReactTestUtils.Simulate.keyDown(columnToSort, {key: 'Enter'})
        jasmine.clock().tick(1)
        columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]
        let svg = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'svg')
        expect(columnToSort.classList).toContain('sorted-asc')
        expect(svg.classList).toContain('icon-arrow_drop_up')

        ReactTestUtils.Simulate.keyDown(columnToSort, {key: 'Enter'})
        jasmine.clock().tick(1)
        columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]
        svg = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'svg')
        expect(columnToSort.classList).toContain('sorted-desc')
        expect(svg.classList).toContain('icon-arrow_drop_down')

        ReactTestUtils.Simulate.keyDown(columnToSort, {key: 'Enter'})
        jasmine.clock().tick(1)
        columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]
        const svgs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'svg')
        expect(svgs.length).toEqual(0)
        columnToSort.classList.forEach(klass => expect(klass).not.toMatch(/sorted/))
      });
    });

    describe('clicking on an unsortable column', () => {
      it('does nothing', () => {
        const component = renderComponent({columns, data})
        let unsortableColumn = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'th')[0]

        ReactTestUtils.Simulate.click(unsortableColumn)
        jasmine.clock().tick(1)

        unsortableColumn = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'th')[0]
        unsortableColumn.classList.forEach(klass => expect(klass).not.toMatch(/sorted/))
      })
    })

    // describe('TableCell', function() {
    //   function renderTableCell({children, ...props}) {
    //     return ReactDOM.render((
    //         <table>
    //           <tbody>
    //           <tr>
    //             <TableCell {...props}>
    //               {children}
    //             </TableCell>
    //           </tr>
    //           </tbody>
    //         </table>
    //       ), root
    //     );
    //
    //   }
    //
    //   it('contains the given children', function() {
    //     renderTableCell({children: (<p>This is my text</p>)});
    //     expect('td').toExist();
    //     expect('td > p').toExist();
    //     expect('td > p').toContainText('This is my text');
    //   });
    //
    //   it('adds the additional classes, id and styles to the th', function() {
    //     renderTableCell({
    //       id: 'cell-id',
    //       className: 'cell-light',
    //       style: {opacity: '0.5'}
    //     });
    //     expect('td').toHaveClass('cell-light');
    //     expect('td').toHaveProp('id', 'cell-id');
    //     expect('td').toHaveCss({opacity: '0.5'});
    //   });
    //
    describe('FlexTableCell', () => {
      it('renders custom', () => {
        class CustomCell extends React.Component {
          render() {
            return (
              <FlexTableCell>
                {this.props.value}
              </FlexTableCell>
            );
          }
        }

        const columnsWithCustom = columns.concat(
          [{
            attribute: 'custom',
            displayName: 'Custom',
            sortable: true,
            CustomCell
          }]
        )
        const dataWithCustom = data.map((datum, index) => {
          return {
            ...datum,
            custom: `custom-${index + 1}`
          }
        })

        const component = renderComponent({columns: columnsWithCustom, data: dataWithCustom, defaultSort: 'custom'})

        const customHeader = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'th')[3]
        expect(customHeader.classList).toContain('sortable')

        const rows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')
        rows.forEach((row, index) => {
          if (index == 0) return;
          expect(row.childNodes[3].textContent).toEqual(`custom-${index}`)
        })
      })

      it('adds the additional classes, id and styles', () => {
        const component = ReactTestUtils.renderIntoDocument(<FlexTableCell
          id="cell-id"
          className="cell-light"
          style={{opacity: '0.5'}}/>)

        const renderedCell = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'td')
        expect(renderedCell.id).toEqual('cell-id')
        expect(renderedCell.classList).toContain('cell-light')
        expect(renderedCell.style.opacity).toEqual('0.5')
      })
    })

    describe('FlexTableRow', () => {
      it('renders custom rows (header row is unaffected)', () => {
        class CustomRow extends React.Component {
          render() {
            return <FlexTableRow>
              <span>{this.props.children}</span>
            </FlexTableRow>
          }
        }

        const component = renderComponent({columns, data, CustomRow})

        const renderedRow = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')[1]
        const childNodes = renderedRow.childNodes
        expect(childNodes.length).toEqual(1)
        expect(childNodes[0].tagName).toEqual('SPAN')

        const headerRow = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')[0]
        expect(headerRow.childNodes[0].tagName).toEqual('DIV')
      })

      it('adds the additional classes, id and styles', function() {
        const component = ReactTestUtils.renderIntoDocument(<FlexTableRow id="row-id" className="row-light" style={{opacity: 0.5}}/>)

        const renderedRow = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'tr')
        expect(renderedRow.id).toEqual('row-id')
        expect(renderedRow.classList).toContain('row-light')
        expect(renderedRow.style.opacity).toEqual('0.5')
      });
    })

    describe('with custom column sortBy', function() {
      it('uses custom sortBy function', function() {
        const columnsWithCustomSortBy = columns.map(column => {
          if (column.attribute === 'theDefault') {
            return {...column, sortBy: value => -value}
          }
          return column
        })

        const component = renderComponent({columns: columnsWithCustomSortBy, data, defaultSort: 'theDefault'})
        const renderedRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')
        expect(renderedRows[1].childNodes[2].textContent).toEqual('3')
        expect(renderedRows[2].childNodes[2].textContent).toEqual('2')
        expect(renderedRows[3].childNodes[2].textContent).toEqual('1')
      })
    })
  })
})

