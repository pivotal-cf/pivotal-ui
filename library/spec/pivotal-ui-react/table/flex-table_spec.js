import '../spec_helper' ;
import ReactTestUtils from 'react-addons-test-utils'
import {FlexTable, FlexTableCell, FlexTableRow} from 'pui-react-table';

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
      },
      {
        attribute: 'width',
        displayName: 'SpecifiedWidth',
        cellClass: 'col-6'
      }
    ]

    const data = [
      {title: 'foo', bar: 'a', theDefault: 3, width: '11'},
      {title: 'sup', bar: 'c', theDefault: 2, width: '21'},
      {title: 'yee', bar: 'b', theDefault: 1, width: '31'}
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
      expect(renderedTable).toHaveClass('table-sortable');
      expect(renderedTable).toHaveClass('table-class');
      expect(renderedTable).toHaveAttr('id', 'table-id');
      expect(renderedTable).toHaveCss({opacity: '0.5'})
    });

    it('adds the class "sortable" on all sortable columns', () => {
      const component = renderComponent({columns, data})
      const sortableColumns = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')

      expect(sortableColumns.length).toEqual(2)
      expect(sortableColumns[0]).toHaveText('Bar')
      expect(sortableColumns[1]).toHaveText('DefaultSort')
    });

    it('accepts a "width" attribute which sets the column width using a class', () => {
      const component = renderComponent({columns, data})
      const widthSpecifiedColumns = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'col-6');

      expect(widthSpecifiedColumns.length).toEqual(4)
      expect(widthSpecifiedColumns[0]).toHaveText('SpecifiedWidth')
    });

    it('sorts table rows by the first sortable column with no default sort', () => {
      const component = renderComponent({columns, data})
      const renderedRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')
      expect(renderedRows[1].childNodes[1]).toHaveText('a')
      expect(renderedRows[2].childNodes[1]).toHaveText('b')
      expect(renderedRows[3].childNodes[1]).toHaveText('c')
    });

    it('respects default sort', () => {
      const component = renderComponent({columns, data, defaultSort: 'theDefault'})
      const renderedRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')

      expect(renderedRows.length).toEqual(4)
      renderedRows.map((row, index) => {
        if(index == 0) return
        expect(row.childNodes[2]).toHaveText(`${index}`)
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
          expect(row.childNodes[2]).toHaveText(`${index}`)
        })
      });

      it('sorts first by ASC, then DESC, then no sort', () => {
        const component = renderComponent({columns, data})
        let columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]

        ReactTestUtils.Simulate.click(columnToSort)
        jasmine.clock().tick(1)
        columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]
        let svg = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'svg')
        expect(columnToSort).toHaveClass('sorted-asc')
        expect(svg).toHaveClass('icon-arrow_drop_up')

        ReactTestUtils.Simulate.click(columnToSort)
        jasmine.clock().tick(1)
        columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]
        svg = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'svg')
        expect(columnToSort).toHaveClass('sorted-desc')
        expect(svg).toHaveClass('icon-arrow_drop_down')

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
          expect(renderedRows[1].childNodes[1]).toHaveText('a')
          expect(renderedRows[2].childNodes[1]).toHaveText('c')
          expect(renderedRows[3].childNodes[1]).toHaveText('b')
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
        expect(columnToSort).toHaveClass('sorted-asc')
        expect(svg).toHaveClass('icon-arrow_drop_up')

        ReactTestUtils.Simulate.keyDown(columnToSort, {key: 'Enter'})
        jasmine.clock().tick(1)
        columnToSort = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'sortable')[1]
        svg = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'svg')
        expect(columnToSort).toHaveClass('sorted-desc')
        expect(svg).toHaveClass('icon-arrow_drop_down')

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

        const customHeader = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'th')[4]
        expect(customHeader).toHaveClass('sortable')

        const rows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')
        rows.forEach((row, index) => {
          if (index == 0) return;
          expect(row.childNodes[4]).toHaveText(`custom-${index}`)
        })
      })

      it('adds the additional classes, id and styles', () => {
        const component = ReactTestUtils.renderIntoDocument(<FlexTableCell
          id="cell-id"
          className="cell-light"
          style={{opacity: '0.5'}}/>)

        const renderedCell = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'td')
        expect(renderedCell).toHaveAttr('id', 'cell-id')
        expect(renderedCell).toHaveClass('cell-light')
        expect(renderedCell).toHaveCss({opacity: '0.5'})
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
        expect(renderedRow).toHaveAttr('id', 'row-id')
        expect(renderedRow).toHaveClass('row-light')
        expect(renderedRow).toHaveCss({opacity: '0.5'})
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
        expect(renderedRows[1].childNodes[2]).toHaveText('3')
        expect(renderedRows[2].childNodes[2]).toHaveText('2')
        expect(renderedRows[3].childNodes[2]).toHaveText('1')
      })
    })
  })

  describe('additional FlexTable props', () => {
    let data

    beforeEach(() => {
      data = [{
        guid: 'guid-1'
      }, {
        guid: 'guid-2'
      }]
    })

    describe('apply a class to the header row, but not to the body rows', () => {
      let renderedRows

      beforeEach(() => {
        const columns = [{
          attribute: 'guid'
        }]
        const headerRowClassName = 'header-class'
        const component = renderComponent({
          columns,
          data,
          headerRowClassName
        })
        renderedRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')
      })

      it('adds the class to the header row', () => {
        expect(renderedRows[0]).toHaveClass('header-class')
      })

      it('does not add the class to the body rows', () => {
        expect(renderedRows[1]).not.toHaveClass('header-class')
        expect(renderedRows[2]).not.toHaveClass('header-class')
      })
    })

    describe('apply a class to the body rows, but not to the header row', () => {
      let renderedRows

      beforeEach(() => {
        const columns = [{
          attribute: 'guid'
        }]
        const bodyRowClassName = 'rows-class'
        const component = renderComponent({
          columns,
          data,
          bodyRowClassName
        })
        renderedRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'tr')
      })

      it('does not add the class to the header row', () => {
        expect(renderedRows[0]).not.toHaveClass('rows-class')
      })

      it('adds the class to the body rows', () => {
        expect(renderedRows[1]).toHaveClass('rows-class')
        expect(renderedRows[2]).toHaveClass('rows-class')
      })
    })

    describe('hide header row', () => {
      let component

      beforeEach(() => {
        const columns = [{
          attribute: 'guid'
        }]
        component = renderComponent({
          columns,
          data,
          hideHeaderRow: true
        })
      })

      it('does not render the header row', () => {
        const headers = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'th')
        expect(headers.length).toBe(0)
      })

      it('renders the body rows', () => {
        const cells = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'td')
        expect(cells.length).toBe(2)
      })
    })
  })
})

