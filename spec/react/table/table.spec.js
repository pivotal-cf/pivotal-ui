import React from 'react';
import ReactDOM from 'react-dom';
import {
  Caption,
  Table,
  TableSelectable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TrHeader,
  TrHeaderForDrawers,
  TrWithDrawer,
  TrWithoutDrawer,
  SelectionContext, TrForBody
} from '../../../src/react/table';

describe('Table', () => {
  it('renders a table', () => {
    ReactDOM.render(<Table/>, root);
    expect('table').toExist();
    expect('table').toHaveClass('pui-table');
  });

  it('passes through classnames', () => {
    ReactDOM.render(<Table className="my-table"/>, root);
    expect('table').toHaveClass('my-table');
  });
});

describe('Caption', () => {
  it('renders a caption', () => {
    ReactDOM.render(<Table><Caption>My cool table</Caption></Table>, root);
    expect('caption').toHaveText('My cool table');
  });

  it('passes through classnames', () => {
    ReactDOM.render(<Table><Caption className="my-caption">My cool table</Caption></Table>, root);
    expect('caption').toHaveClass('my-caption');
  });
});

describe('Th', () => {
  it('defaults the scope to col', () => {
    ReactDOM.render(<Table><Thead><Tr><Th>My awesome header</Th></Tr></Thead></Table>, root);
    expect('table thead tr th').toHaveAttr('scope', 'col');
  });
});

describe('TableSelectable', () => {
  it('renders a table', () => {
    ReactDOM.render(<TableSelectable/>, root);
    expect('table').toExist();
    expect('table').toHaveClass('pui-table');
  });

  it('creates a selection context', () => {
    let contextValue = 'fakeContext';

    ReactDOM.render(<TableSelectable>
      <SelectionContext.Consumer>
        {value => { contextValue = value; }}
      </SelectionContext.Consumer>
    </TableSelectable>, root);

    expect(contextValue.isSelectableTable).toBeTruthy();
  });

  describe('onSelectionChange', () => {
    const onSelectionChangedSpy = jest.fn();

    beforeEach(() => {
      ReactDOM.render(
          <TableSelectable identifiers={['GH', 'MH', 'AT']} onSelectionChanged={onSelectionChangedSpy}>
            <Thead>
              <TrHeader>
                <Td>Name</Td>
                <Td>Surname</Td>
              </TrHeader>
            </Thead>
            <Tbody>
              <TrForBody identifier={'MH'}>
                <Td>Margaret</Td>
                <Td>Hamilton</Td>
              </TrForBody>
              <TrForBody identifier={'GH'}>
                <Td>Grace</Td>
                <Td>Hopper</Td>
              </TrForBody>
              <TrForBody identifier={'AT'}>
                <Td>Alan</Td>
                <Td>Turing</Td>
              </TrForBody>
            </Tbody>
          </TableSelectable>, root);
    });

    it('is called with the appropriate identifiers when selecting individual rows ', () => {
      let checkboxes = document.querySelectorAll('tbody input');

      checkboxes[0].click();
      expect(onSelectionChangedSpy).toHaveBeenCalledWith({'MH': true});

      checkboxes[1].click();
      expect(onSelectionChangedSpy).toHaveBeenCalledWith({'MH': true, 'GH': true});

      checkboxes[0].click();
      expect(onSelectionChangedSpy).toHaveBeenCalledWith({'GH': true});
    });

    it('is called with all identifiers when selecting all', () => {
      let selectAll = document.querySelector('thead input');

      selectAll.click();
      expect(onSelectionChangedSpy).toHaveBeenCalledWith({'MH': true, 'GH': true, 'AT': true});

      selectAll.click();
      expect(onSelectionChangedSpy).toHaveBeenCalledWith({});
    });
  });
});

describe('TrHeader', () => {
  it('renders table header cells given as children', () => {
    ReactDOM.render(<Table><Thead><TrHeader>
      <Th>Content header 1</Th>
      <Th>Content header 2</Th>
    </TrHeader></Thead></Table>, root);

    const ths = document.querySelectorAll('th');
    expect(ths).toHaveLength(2);
    expect(ths[0]).toHaveText('Content header 1');
    expect(ths[1]).toHaveText('Content header 2');
  });
});

describe('TrHeaderForDrawers', () => {
  describe('in a standard table', () => {
    beforeEach(() => {
      ReactDOM.render(<Table><Thead><TrHeaderForDrawers>
        <Th>Content header 1</Th>
        <Th>Content header 2</Th>
      </TrHeaderForDrawers></Thead></Table>, root);
    });

    it('renders an empty table header that sets the column' +
        'to the proper width for collapsible toggles',
        () => {
          expect(document.querySelectorAll('th')[0]).toHaveText('');
          expect(document.querySelectorAll('th')[0]).toHaveClass('pui-table--collapsible-toggle');
        }
    );

    it('renders table header cells given as children after the toggle header cell', () => {
      const ths = document.querySelectorAll('th');
      expect(ths).toHaveLength(3);
      expect(ths[1]).toHaveText('Content header 1');
      expect(ths[2]).toHaveText('Content header 2');
    });
  });

  describe('in a selectable Table', ()=>{
    it('renders a table header that sets the column ' +
        'to the proper width for collapsible toggles and selectOne checkboxes',
        () => {
          ReactDOM.render(<TableSelectable identifiers={[]}><Thead><TrHeaderForDrawers>
            <Th>Content header 1</Th>
            <Th>Content header 2</Th>
          </TrHeaderForDrawers></Thead></TableSelectable>, root);

          expect(document.querySelectorAll('th')[0]).toHaveClass('pui-table--selectable-toggle');
          expect(document.querySelectorAll('th')[1]).toHaveClass('pui-table--collapsible-toggle');
        }
    );
  });
});


describe('TrWithoutDrawer', () => {
  beforeEach(() => {
    ReactDOM.render(<Table>
      <Tbody>
        <TrWithoutDrawer>
          <Td>Content cell 1</Td>
          <Td>Content cell 2</Td>
        </TrWithoutDrawer>
      </Tbody>
    </Table>, root);
  });

  it('renders an empty table data that sets the column to the proper width for collapsible toggles', () => {
        expect(document.querySelectorAll('td')[0]).toHaveText('');
        expect(document.querySelectorAll('td')[0]).toHaveClass('pui-table--collapsible-toggle');
      }
  );

  it('renders table data cells given as children after the table data spacer cell', () => {
    const tds = document.querySelectorAll('td');
    expect(tds).toHaveLength(3);
    expect(tds[1]).toHaveText('Content cell 1');
    expect(tds[2]).toHaveText('Content cell 2');
  });

  describe('when in a selectable table', () => {
    it('sets the column to the proper width for collapsible toggles', () => {
      ReactDOM.render(<TableSelectable identifiers={[]}>
        <Tbody>
          <TrWithoutDrawer>
            <Td>Content cell 1</Td>
            <Td>Content cell 2</Td>
          </TrWithoutDrawer>
        </Tbody>
      </TableSelectable>, root);

      expect(document.querySelectorAll('td')[1]).toHaveText('');
      expect(document.querySelectorAll('td')[1]).toHaveClass('pui-table--collapsible-toggle');
    });
  });
});

describe('TrWithDrawer', () => {
  let ariaLabelCollapsed, ariaLabelExpanded, drawerContent, onExpandSpy, className;

  beforeEach(() => {
    onExpandSpy = jest.fn();
    ariaLabelCollapsed = 'show the thing';
    ariaLabelExpanded = 'hide the thing';
    className = 'my-special-class';
    drawerContent = <i>Drawer content</i>;

    ReactDOM.render(<Table><Tbody>
      <TrWithDrawer {...{ariaLabelCollapsed, ariaLabelExpanded, drawerContent, className, onExpand: onExpandSpy}}>
        <Td>Content cell 1</Td>
        <Td>Content cell 2</Td>
      </TrWithDrawer>
    </Tbody></Table>, root);
  });

  it('passes the className to the hidden drawer row', () => {
    const drawerTr = document.querySelectorAll('tr')[1];
    expect(drawerTr).toHaveClass(className);
  });

  it('renders a collapsible toggle for a row drawer in collapsed state', () => {
    const toggleTd = document.querySelectorAll('tr')[0].querySelectorAll('td')[0];
    expect(toggleTd).not.toHaveClass('active-indicator');
    expect(toggleTd.querySelector('button')).toHaveClass('pui-table--collapsible-btn');
    expect(toggleTd.querySelector('button')).toHaveAttr('aria-label', 'show the thing');
    expect(toggleTd.querySelector('button div')).toHaveClass('transition-transform');
    expect(toggleTd.querySelector('button div')).not.toHaveClass('rotate-qtr-turn');
    expect(toggleTd.querySelector('button div svg')).toHaveClass('icon-chevron_right');
  });

  it('renders table data cells given as children after the toggle cell', () => {
    const tds = document.querySelectorAll('tr')[0].querySelectorAll('td');
    expect(tds).toHaveLength(3);
    expect(tds[1]).toHaveText('Content cell 1');
    expect(tds[2]).toHaveText('Content cell 2');
  });

  it('renders hidden drawer row with drawer content in a single full-width cell', () => {
    const drawerTr = document.querySelectorAll('tr')[1];
    const drawerTds = drawerTr.querySelectorAll('td');
    expect(drawerTr).toHaveClass('border-top-0');
    expect(drawerTds).toHaveLength(1);
    expect(drawerTds[0]).toHaveAttr('colspan', '3');
    expect(drawerTds[0].querySelector('.pui-collapsible')).not.toHaveClass('in');
    expect(drawerTds[0].querySelector('.pui-collapsible')).toHaveAttr('aria-hidden', 'true');
    expect(drawerTds[0].querySelector('.pui-collapsible i')).toHaveText('Drawer content');
  });

  describe('when in a selectable table', () => {
    beforeEach(() => {
      ReactDOM.render(<TableSelectable identifiers={[]}><Tbody>
        <TrWithDrawer {...{ariaLabelCollapsed, ariaLabelExpanded, drawerContent, className, onExpand: onExpandSpy}}>
          <Td>Content cell 1</Td>
          <Td>Content cell 2</Td>
        </TrWithDrawer>
      </Tbody></TableSelectable>, root);
    });

    it('extends the drawer across the whole width of the table', () => {
      const drawerTr = document.querySelectorAll('tr')[1];
      const drawerTds = drawerTr.querySelectorAll('td');

      expect(drawerTds).toHaveLength(1);
      expect(drawerTds[0]).toHaveAttr('colspan', '4');
    });

    it('adds the active-indicator before the checkbox when expanded', () => {
      document.querySelector('td button').click();

      const tdContainingCheckbox = document.querySelectorAll('tr')[0].querySelectorAll('td')[0];
      expect(tdContainingCheckbox).toHaveClass('active-indicator');

      const toggleTd = document.querySelectorAll('tr')[0].querySelectorAll('td')[1];
      expect(toggleTd).not.toHaveClass('active-indicator');
    });
  });

  describe('when clicked to expand', () => {
    beforeEach(() => {
      document.querySelector('td button').click();
    });

    it('renders collapsible toggle as expanded', () => {
      const toggleTd = document.querySelectorAll('tr')[0].querySelectorAll('td')[0];
      expect(toggleTd).toHaveClass('active-indicator');
      expect(toggleTd.querySelector('.pui-table--collapsible-btn')).toHaveAttr('aria-label', 'hide the thing');
      expect(toggleTd.querySelector('.pui-table--collapsible-btn div')).toHaveClass('rotate-qtr-turn');
    });

    it('displays the drawer content', () => {
      const drawerTr = document.querySelectorAll('tr')[1];
      const drawer = drawerTr.querySelector('.pui-collapsible');
      expect(drawerTr).not.toHaveClass('border-top-0');
      expect(drawerTr).not.toHaveClass('display-none');
      expect(drawer).toHaveClass('in');
      expect(drawer.getAttribute('aria-hidden')).toBe('false');
    });

    it('calls the onExpand callback', () => {
      expect(onExpandSpy).toHaveBeenCalled();
    });

    describe('when clicked to collapse', () => {
      beforeEach(() => {
        onExpandSpy.mockClear();
        document.querySelector('td button').click();
      });

      it('renders collapsible toggle as collapsed', () => {
        const toggleTd = document.querySelectorAll('tr')[0].querySelectorAll('td')[0];
        expect(toggleTd).not.toHaveClass('active-indicator');
        expect(toggleTd.querySelector('.pui-table--collapsible-btn')).toHaveAttr('aria-label', 'show the thing');
        expect(toggleTd.querySelector('.pui-table--collapsible-btn div')).not.toHaveClass('rotate-qtr-turn');
      });

      it('hides the drawer content', () => {
        const drawerTr = document.querySelectorAll('tr')[1];
        const drawer = document.querySelectorAll('tr')[1].querySelector('.pui-collapsible');
        expect(drawer).not.toHaveClass('in');
        expect(drawer).toHaveAttr('aria-hidden');
        expect(drawerTr).toHaveClass('border-top-0');
        expect(drawerTr).toHaveClass('display-none');
      });

      it('does not call the onExpand callback', () => {
        expect(onExpandSpy).not.toHaveBeenCalled();
      });
    });
  });
});

describe('TrForBody', () => {
  beforeEach(() => {
    ReactDOM.render(
        <Table>
          <Tbody>
            <TrForBody>
              <Td>Content cell 1</Td>
              <Td>Content cell 2</Td>
            </TrForBody>
          </Tbody>
        </Table>, root);
  });

  it('renders a tr', () => {
    expect(document.querySelectorAll('tr')[0]).toExist();
  });

  it('renders only the children into the tr', () => {
    const tds = document.querySelectorAll('td');
    expect(tds).toHaveLength(2);
    expect(tds[0]).toHaveText('Content cell 1');
    expect(tds[1]).toHaveText('Content cell 2');
  });
});


describe.each([
    ['TrHeader', TrHeader],
    ['TrHeaderForDrawers', TrHeaderForDrawers]
])
('Contract for selectable header: %s',
    (_, HeaderComponent) => {
      const contextValue = {
        isSelectableTable: true,
        allAreSelected: () => false,
        someAreSelected: () => false,
        toggleSelectAll: () => {
        }
      };

      const selectableTable = (HeaderComponent) => (
          <TableSelectable identifiers={[]}>
            <SelectionContext.Provider value={contextValue}>
              <Thead>
                <HeaderComponent/>
              </Thead>
            </SelectionContext.Provider>
          </TableSelectable>);

      it('calls the context handler when clicked', () => {
        contextValue.toggleSelectAll = jest.fn();
        ReactDOM.render(selectableTable(HeaderComponent), root);

        document.querySelector('th .pui-checkbox input').click();
        expect(contextValue.toggleSelectAll).toHaveBeenCalledTimes(1);
        expect(contextValue.toggleSelectAll).toHaveBeenCalled();
      });

      it('is checked when allAreSelected', () => {
        contextValue.allAreSelected = () => true;
        ReactDOM.render(selectableTable(HeaderComponent), root);

        expect(document.querySelector('th .pui-checkbox input').checked).toBeTruthy();
      });

      it('is indeterminate when someAreSelected', () => {
        contextValue.someAreSelected = () => true;
        ReactDOM.render(selectableTable(HeaderComponent), root);

        expect(document.querySelector('th .pui-checkbox input').indeterminate).toBeTruthy();
      });

      it('is not checked when none are selected', () => {
        contextValue.allAreSelected = () => false;
        contextValue.someAreSelected = () => false;

        ReactDOM.render(selectableTable(HeaderComponent), root);

        expect(document.querySelector('th .pui-checkbox input').checked).toBeFalsy();
        expect(document.querySelector('th .pui-checkbox input').indeterminate).toBeFalsy();
      });

      describe('with select all (default)', () => {
        beforeEach(() => {
          ReactDOM.render(<TableSelectable identifiers={[]}><Thead><HeaderComponent>
            <Th>Content header 1</Th>
            <Th>Content header 2</Th>
          </HeaderComponent></Thead></TableSelectable>, root);
        });

        it(
            'renders a table header with a selectAll checkbox that sets the column ' +
            'to the proper width for selectOne checkboxes',
            () => {
              expect(document.querySelectorAll('th')[0]).toHaveText('');
              expect(document.querySelectorAll('th')[0]).toHaveClass('pui-table--selectable-toggle');
              expect('th:nth-child(1) .pui-checkbox').toExist();
            }
        );
      });

      describe('withoutSelectAll', () => {
        beforeEach(() => {
          ReactDOM.render(<TableSelectable identifiers={[]}><Thead><HeaderComponent withoutSelectAll>
            <Th>Content header 1</Th>
            <Th>Content header 2</Th>
          </HeaderComponent></Thead></TableSelectable>, root);
        });

        it(
            'renders a table header without a selectAll checkbox, that sets the column' +
            'to the proper width for collapsible toggles and selectOne checkboxes',
            () => {
              expect(document.querySelectorAll('th')[0]).toHaveText('');
              expect(document.querySelectorAll('th')[0]).toHaveClass('pui-table--selectable-toggle');
              expect('th:nth-child(1) .pui-checkbox').not.toExist();
            }
        );
      });
    });

describe.each([
  ['TrForBody', TrForBody, {}],
  ['TrWithDrawer', TrWithDrawer, {ariaLabelExpanded: '', ariaLabelCollapsed: ''}],
  ['TrWithoutDrawer', TrWithoutDrawer, {}]
])
('Contract for body table row: %s', (_, TrComponentUnderTest, props)=>{
  describe('when in a selectable table', ()=> {
    const contextValue = {
      isSelectableTable: true,
      toggleSelected: jest.fn(),
      isSelected: ()=>false,
    };

    const selectableTable = () => (
        <TableSelectable identifiers={[]}>
          <SelectionContext.Provider value={contextValue}>
            <Tbody>
              <TrComponentUnderTest {...props} identifier={'first row'}>
                <Td>Content cell 1</Td>
                <Td>Content cell 2</Td>
              </TrComponentUnderTest>
              <TrComponentUnderTest {...props} identifier={'second row'}>
                <Td>Content cell 11</Td>
                <Td>Content cell 22</Td>
              </TrComponentUnderTest>
            </Tbody>
          </SelectionContext.Provider>
        </TableSelectable>);

    describe('when the table row is selectable (default)', ()=> {
      it('prepends a td that will contain a checkbox', ()=>{
        ReactDOM.render(selectableTable(), root);

        const firstRow = document.querySelectorAll('tr:nth-child(1) td');
        const rowLength = firstRow.length;

        expect(firstRow[0]).toHaveText('');

        expect(firstRow[rowLength-2]).toHaveText('Content cell 1');
        expect(firstRow[rowLength-1]).toHaveText('Content cell 2');
      });

      it('calls the callback when the checkbox is clicked with the appropriate identifier', ()=>{
        ReactDOM.render(selectableTable(), root);

        let checkboxes = document.querySelectorAll('td .pui-checkbox input');
        checkboxes[0].click();
        checkboxes[1].click();
        checkboxes[0].click();

        expect(contextValue.toggleSelected).toHaveBeenCalledTimes(3);
        expect(contextValue.toggleSelected).toHaveBeenNthCalledWith(1, 'first row');
        expect(contextValue.toggleSelected).toHaveBeenNthCalledWith(2, 'second row');
        expect(contextValue.toggleSelected).toHaveBeenNthCalledWith(3, 'first row');
      });

      it('renders checked status when context shows that it should be checked', () => {
        contextValue.isSelected = jest.fn((identifier) => {
          switch (identifier) {
            case 'first row': return false;
            case 'second row': return true;

            default: fail('identifier not recognized');
          }
        });

        ReactDOM.render(selectableTable(), root);

        let checkboxes = document.querySelectorAll('td .pui-checkbox input');
        expect(checkboxes[0].checked).toBeFalsy();
        expect(checkboxes[0].indeterminate).toBeFalsy();
        expect(checkboxes[1].checked).toBeTruthy();
        expect(checkboxes[1].indeterminate).toBeFalsy();
      });
    });

    describe('when the table row is not selectable', ()=> {
      it('renders a blank space where the checkbox would have been', () => {
        ReactDOM.render(
            <TableSelectable identifiers={[]}>
                <Tbody>
                  <TrComponentUnderTest {...props} notSelectable>
                    <Td>Content cell 1</Td>
                    <Td>Content cell 2</Td>
                  </TrComponentUnderTest>
                </Tbody>
            </TableSelectable>, root);

        const tds = document.querySelectorAll('tr:nth-child(1) td');
        const rowLength = tds.length;

        expect('.pui-checkbox input').not.toExist();
        expect(tds[0]).toHaveText('');
        expect(tds[rowLength-2]).toHaveText('Content cell 1');
        expect(tds[rowLength-1]).toHaveText('Content cell 2');
      });
    });
  });
});
