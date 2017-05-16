import '../spec_helper';
import {FlexTable, FlexTableCell, FlexTableRow} from 'pui-react-table';
import {PropTypes} from 'prop-types';

describe('Flex Table', () => {
  let subject, data, columns;

  describe('basic render and sort', () => {
    columns = [
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
    ];

    data = [
      {title: 'foo', bar: 'a', theDefault: 3, width: '11'},
      {title: 'sup', bar: 'c', theDefault: 2, width: '21'},
      {title: 'yee', bar: 'b', theDefault: 1, width: '31'}
    ];

    beforeEach(() => {
      subject = ReactDOM.render(<FlexTable {...{columns, data}}/>, root);
    });

    it('renders the table with the expected styles and ids', () => {
      subject::setProps({
        className: ['table-class'],
        id: 'table-id',
        style: {opacity: '0.5'}
      });

      expect('.table').toHaveClass('table-sortable');
      expect('.table').toHaveClass('table-class');
      expect('.table').toHaveAttr('id', 'table-id');
      expect('.table').toHaveCss({opacity: '0.5'});
    });

    it('adds the class "sortable" on all sortable columns', () => {
      expect('.sortable').toHaveLength(2);
      expect('.sortable:eq(0)').toHaveText('Bar');
      expect('.sortable:eq(1)').toHaveText('DefaultSort');
    });

    it('accepts a "width" attribute which sets the column width using a class', () => {
      expect('.col-6').toHaveLength(4);
      expect('.col-6:eq(0)').toHaveText('SpecifiedWidth');
    });

    it('sorts table rows by the first sortable column with no default sort', () => {
      expect('.tr:eq(1) .td:eq(1)').toHaveText('a');
      expect('.tr:eq(2) .td:eq(1)').toHaveText('b');
      expect('.tr:eq(3) .td:eq(1)').toHaveText('c');
    });

    it('respects default sort', () => {
      ReactDOM.unmountComponentAtNode(root);
      subject = ReactDOM.render(<FlexTable {...{columns, data, defaultSort: 'theDefault'}}/>, root);

      expect('.tr').toHaveLength(4);
      expect('.tr:eq(1) .td:eq(2)').toHaveText(1);
      expect('.tr:eq(2) .td:eq(2)').toHaveText(2);
      expect('.tr:eq(3) .td:eq(2)').toHaveText(3);
    });

    describe('clicking on a sortable column', () => {
      it('sorts table rows by that column', () => {
        $('.sortable:eq(1)').simulate('click');
        expect('.tr').toHaveLength(4);
        expect('.tr:eq(1) .td:eq(2)').toHaveText(1);
        expect('.tr:eq(2) .td:eq(2)').toHaveText(2);
        expect('.tr:eq(3) .td:eq(2)').toHaveText(3);
      });

      it('sorts first by ASC, then DESC, then no sort', () => {
        $('.sortable:eq(1)').simulate('click');
        expect('.sortable:eq(1)').toHaveClass('sorted-asc');
        expect('.sortable:eq(1) svg').toHaveClass('icon-arrow_drop_up');


        $('.sortable:eq(1)').simulate('click');
        expect('.sortable:eq(1)').toHaveClass('sorted-desc');
        expect('.sortable:eq(1) svg').toHaveClass('icon-arrow_drop_down');

        $('.sortable:eq(1)').simulate('click');

        expect('.sorted-asc').not.toExist();
        expect('.sorted-desc').not.toExist();
        expect('.sortable:eq(1) svg').not.toExist();
      });

      describe('when a sorted column is clicked twice (i.e., "unsorted")', () => {
        it('sorts according to the original order', () => {
          $('.sortable:eq(0)').simulate('click');
          $('.sortable:eq(0)').simulate('click');

          expect('.tr:eq(1) .td:eq(1)').toHaveText('a');
          expect('.tr:eq(2) .td:eq(1)').toHaveText('c');
          expect('.tr:eq(3) .td:eq(1)').toHaveText('b');
        });
      });
    });

    describe('pressing <enter> on a sortable column', () => {
      it('sorts first by ASC, then DESC, then no sort', () => {
        $('.sortable:eq(1)').simulate('keyDown', {key: 'Enter'});
        expect('.sortable:eq(1)').toHaveClass('sorted-asc');
        expect('.sortable:eq(1) svg').toHaveClass('icon-arrow_drop_up');


        $('.sortable:eq(1)').simulate('keyDown', {key: 'Enter'});
        expect('.sortable:eq(1)').toHaveClass('sorted-desc');
        expect('.sortable:eq(1) svg').toHaveClass('icon-arrow_drop_down');

        $('.sortable:eq(1)').simulate('keyDown', {key: 'Enter'});
        expect('.sorted-asc').not.toExist();
        expect('.sorted-desc').not.toExist();
        expect('.sortable:eq(1) svg').not.toExist();
      });
    });

    describe('clicking on an unsortable column', () => {
      it('does nothing', () => {
        $('.th:eq(0)').simulate('click');

        expect('.th:eq(0)').not.toHaveClass('sorted-asc');
        expect('.th:eq(0)').not.toHaveClass('sorted-desc');
      });
    });

    describe('FlexTableCell', () => {
      beforeEach(() => {
        class CustomCell extends React.Component {
          static propTypes = {
            value: PropTypes.oneOfType([PropTypes.node, PropTypes.object])
          };

          render() {
            return (
              <FlexTableCell {...{id: 'cell-id', className: 'cell-light', style: {opacity: '0.5'}}}>
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
        );
        const dataWithCustom = data.map((datum, index) => {
          return {
            ...datum,
            custom: `custom-${index + 1}`
          };
        });

        subject::setProps({columns: columnsWithCustom, data: dataWithCustom, defaultSort: 'custom'});

      });

      it('renders custom', () => {
        expect('.th:eq(4)').toHaveClass('sortable');
        expect('.tr:eq(1) .td:eq(4)').toHaveText('custom-1');
        expect('.tr:eq(2) .td:eq(4)').toHaveText('custom-2');
        expect('.tr:eq(3) .td:eq(4)').toHaveText('custom-3');
      });

      it('adds the additional classes, id and styles', () => {
        expect('.tr:eq(1) .td:eq(4)').toHaveAttr('id', 'cell-id');
        expect('.tr:eq(1) .td:eq(4)').toHaveClass('cell-light');
        expect('.tr:eq(1) .td:eq(4)').toHaveCss({opacity: '0.5'});
      });
    });

    describe('FlexTableRow', () => {
      beforeEach(() => {
        class CustomRow extends React.Component {
          render() {
            return (<FlexTableRow id="row-id" className="row-light" style={{opacity: 0.5}}>
              <span>{this.props.children}</span>
            </FlexTableRow>);
          }
        }
        subject::setProps({CustomRow});
      });

      it('renders custom rows (header row is unaffected)', () => {
        expect('.tr:eq(0) > div').toExist();
        expect('.tr:eq(0) > span').not.toExist();

        expect('.tr:eq(1) > div').not.toExist();
        expect('.tr:eq(1) > span').toExist();
      });

      it('adds the additional classes, id and styles', function() {
        expect('.tr:eq(1)').toHaveAttr('id', 'row-id');
        expect('.tr:eq(1)').toHaveClass('row-light');
        expect('.tr:eq(1)').toHaveCss({opacity: '0.5'});
      });
    });

    describe('with custom column sortBy', function() {
      it('uses custom sortBy function', function() {
        const columnsWithCustomSortBy = columns.map(column => {
          if (column.attribute === 'theDefault') {
            return {...column, sortBy: value => -value};
          }
          return column;
        });

        ReactDOM.unmountComponentAtNode(root);
        ReactDOM.render(<FlexTable {...{data, columns: columnsWithCustomSortBy, defaultSort: 'theDefault'}}/>, root);

        expect('.tr:eq(1) .td:eq(2)').toHaveText('3');
        expect('.tr:eq(2) .td:eq(2)').toHaveText('2');
        expect('.tr:eq(3) .td:eq(2)').toHaveText('1');
      });
    });
  });
});
